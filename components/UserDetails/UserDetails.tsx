import Input from '@/components/Form/Input'
import { userTypeForms, setSignupData } from '@/store/reducers/signup'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import StepperButtonGroup from '@/components/StepperButton/StepperButtonGroup'
import { MouseEventHandler } from 'react'
import { useDispatch } from 'react-redux'
import { ActionType } from '@/store/reducers/steps'

export interface IUserDetailsProps {
  type: string
  onClickBack: MouseEventHandler<HTMLButtonElement>
}

export interface IInputProps {
  name: string
  label: string
}

const UserDetails = ({ type, onClickBack }: IUserDetailsProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const form = userTypeForms[type as keyof typeof userTypeForms] || []

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(form.schema),
  })

  const onSubmit = (data: any) => {
    dispatch(setSignupData(data))
    dispatch({ type: ActionType.INCREASE })
  }

  return (
    <>
      <div className={`bg-blue-50 px-4 py-4 rounded-md`}>
        {form.inputs.map((item: IInputProps) => (
          <Input
            key={item.name}
            label={`${t(item.label)}: *`}
            errors={errors[item.name]}
            {...register(item.name)}
          />
        ))}
      </div>
      <StepperButtonGroup
        steps={[
          {
            disabled: false,
            direction: 'backward',
            onClick: onClickBack,
          },
          {
            disabled: !errors,
            direction: 'forward',
            onClick: handleSubmit(onSubmit),
          },
        ]}
      />
    </>
  )
}

export default UserDetails
