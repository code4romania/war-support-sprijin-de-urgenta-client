import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { ActionType } from '@/store/reducers/steps'
import StepperButtonGroup from '@/components/StepperButton/StepperButtonGroup'
import Input from '@/components/Form/Input'
import { SchemaOf } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

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
  const { t } = useTranslation()
  const dispatch = useDispatch()
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

  const onSubmit = (values: unknown) => {
    console.log('register', values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`bg-blue-50 px-4 py-4 rounded-md`}>
        {inputs.map((input: IInput) => (
          <Input
            key={input.name}
            label={`${t(input.label)}: *`}
            errors={errors[input.name]}
            type={input.type}
            {...register(input.name)}
          />
        ))}
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
