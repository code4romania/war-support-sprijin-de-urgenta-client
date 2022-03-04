import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { ActionType } from '@/store/reducers/steps'
import StepperButtonGroup from '@/components/StepperButton/StepperButtonGroup'
import Input from '@/components/Form/Input'
import { SchemaOf } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { State } from '@/store/types/state.type'
import endpoints from 'endpoints.json'
import { useState } from 'react'
import { reauthenticate } from '@/store/reducers/auth'
import { setCookie } from '@/utils/cookies'
import i18n from 'i18next'
import { useRouter } from 'next/router'

interface ICredentials {
  email: string
  password: string
  re_password: string
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

const UserCredentials = ({}) => {
  const [serverErrors, setServerErrors] = useState<{ [key: string]: string[] }>(
    {}
  )
  const { t } = useTranslation()
  const router = useRouter();
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
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
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
        router.push('/request/resources')
      } else {
        setServerErrors(response)
      }
    } catch (e) {
      setServerErrors({
        general: ['Failed to create a new account. Try later'],
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`bg-blue-50 px-4 py-4 rounded-md`}>
        <div className="max-w-sm">
          {inputs.map((input: IInput) => (
            <Input
              key={input.name}
              label={`${t(input.label)}: *`}
              errors={
                serverErrors[input.name]
                  ? { message: serverErrors[input.name].join('\n') }
                  : errors[input.name]
              }
              type={input.type}
              {...register(input.name)}
            />
          ))}
          {serverErrors['general']?.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
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
