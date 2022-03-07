import Input from '@/components/Form/Input'
import StepperButtonGroup from '@/components/StepperButton/StepperButtonGroup'
import { reauthenticate } from '@/store/reducers/auth'
import { ActionType } from '@/store/reducers/steps'
import { State } from '@/store/types/state.type'
import { setCookie } from '@/utils/cookies'
import { yupResolver } from '@hookform/resolvers/yup'
import endpoints from 'endpoints.json'
import i18n from 'i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { SchemaOf } from 'yup'
import Consent from '../GdprConsent'

interface ICredentials {
  email: string
  password: string
  re_password: string
  gdpr_consent: boolean
}

interface IInput {
  name: string
  label: string
  type: string
}

const INPUTS = [
  {
    name: 'email',
    label: 'signup.userType.email',
    type: 'email',
  },
  { name: 'password', label: 'signup.userType.password', type: 'password' },
  {
    name: 're_password',
    label: 'signup.userType.re_password',
    type: 'password',
  },
]

interface UserCredentialsProps {
  resourceType: string
}

const UserCredentials = ({ resourceType }: UserCredentialsProps) => {
  const [serverErrors, setServerErrors] = useState<{ [key: string]: string[] }>(
    {}
  )
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const userData = useSelector((state: State) => state.signup?.userData)
  const inputs = INPUTS || []

  const schema: SchemaOf<ICredentials> = yup.object().shape({
    email: yup
      .string()
      .email(t('signup.userType.email.invalid'))
      .required(t('signup.userType.email.required')),
    password: yup.string().required('Va rugam introduceti o parola'),
    re_password: yup
      .string()
      .oneOf(
        [yup.ref('password'), null],
        t('signup.userType.re_password.missmatch')
      )
      .required(t('signup.userType.re_password.required')),
    gdpr_consent: yup
      .boolean().required().oneOf([true], t('signup.error.gdpr.required'))
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ [key: string | 'gdpr_consent']: any }>({
    resolver: yupResolver(schema),
    defaultValues: {
      gdpr_consent: false
    }
  })

  const handleBack = () => {
    dispatch({ type: ActionType.DECREASE })
  }
  const onSubmit = async (values: any) => {
    const data = { ...values, ...userData }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PUBLIC_API}/${i18n.language}${endpoints.registration}`,
        {
          method: 'POST',
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer',
          body: JSON.stringify({ ...data, username: data.email }),
        }
      )
      const response = await res.json()
      const { access_token, user } = response
      if (access_token) {
        setCookie('token', access_token)
        dispatch(reauthenticate({ token: access_token, userPk: user.pk }))
        router.push(`/${resourceType}/resources`)
      } else {
        setServerErrors(response)
      }
    } catch (e) {
      setServerErrors({
        'non_field_errors': [t('register.genericError')],
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-4 rounded-md bg-blue-50">
        <div className="max-w-sm">
          {inputs.map((input: IInput) => (
            <Input
              key={input.name}
              required
              label={`${t(input.label)}:`}
              errors={
                serverErrors[input.name]
                  ? { message: serverErrors[input.name].join('\n') }
                  : errors[input.name]
              }
              type={input.type}
              {...register(input.name)}
            />
          ))}
        </div>
        {serverErrors['non_field_errors']?.map(
            (error: string, index: number) => (
              <div key={index} className={'bg-red-50 p-1 px-2 text-white'}>
                {error}
              </div>
            )
          )}
      </div>

      <div className={`bg-blue-50 px-4 py-4 rounded-md mt-4`}>
        <div className="md:w-2/3 max-w-small">
          <Consent name={'gdpr_consent'}
            register={register}
            text={`${t('gdpr.consent')}`}
            errors={errors.gdpr_consent} />
        </div>
      </div>
      <StepperButtonGroup
        steps={[
          { disabled: false, direction: 'backward', onClick: handleBack },
          {
            disabled: false,
            direction: 'forward',
            onClick: handleSubmit(onSubmit),
          },
        ]}
      />
    </form>
  )
}

export default UserCredentials
