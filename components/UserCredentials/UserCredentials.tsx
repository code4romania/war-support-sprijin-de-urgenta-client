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

const schema: SchemaOf<ICredentials> = yup.object().shape({
  email: yup
    .string()
    .email('Va rugam introduceti un email valid')
    .required('Va rugam introduceti email-ul'),
  password: yup.string().required('Va rugam introduceti o parola'),
  re_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Parola nu coincide')
    .required('Va rugam confirmati parola'),
})

const UserCredentials = () => {
  const [serverErrors, setServerErrors] = useState({})
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const userData = useSelector((state: State) => state.signup.userData)
  const inputs = INPUTS || []

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
        `${process.env.NEXT_PUBLIC_PUBLIC_API}${endpoints.registration}`,
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
          body: JSON.stringify(data),
        }
      )
      const response = await res.json()
      if (response.access_token) {
        setCookie('token', response.access_token)
        dispatch(reauthenticate(response.access_token))
        dispatch({ type: ActionType.INCREASE })
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
        {/*{serverErrors.map((error) => (*/}
        {/*  <div>{error}</div>*/}
        {/*))}*/}
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
