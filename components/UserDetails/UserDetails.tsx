import Input from '@/components/Form/Input'
import { setSignupData } from '@/store/reducers/signup'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import StepperButtonGroup from '@/components/StepperButton/StepperButtonGroup'
import { MouseEventHandler } from 'react'
import { useDispatch } from 'react-redux'
import { ActionType } from '@/store/reducers/steps'
import * as yup from 'yup'

export interface IUserDetailsProps {
  type: number
  onClickBack: MouseEventHandler<HTMLButtonElement>
}

export interface IInputProps {
  name: string
  label: string
}

const UserDetails = ({ type, onClickBack }: IUserDetailsProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const userTypeForms: { [key: number]: any } = {
    [1]: {
      inputs: [
        { name: 'last_name', label: 'signup.userType.last_name' },
        { name: 'first_name', label: 'signup.userType.first_name' },
      ],
      schema: yup.object().shape({
        last_name: yup
          .string()
          .required(t('signup.userType.last_name.required')),
        first_name: yup
          .string()
          .required(t('signup.userType.first_name.required')),
      }),
    },
    [2]: {
      inputs: [
        { name: 'business_name', label: 'signup.userType.business_name' },
        {
          name: 'identification_no',
          label: 'signup.userType.identification_no',
        },
      ],
      schema: yup.object().shape({
        business_name: yup
          .string()
          .required(t('signup.userType.business_name.required')),
        identification_no: yup
          .string()
          .required(t('signup.userType.identification_no.required')),
      }),
    },
    [3]: {
      inputs: [
        { name: 'business_name', label: 'signup.userType.business_name' },
      ],
      schema: yup.object().shape({
        business_name: yup
          .string()
          .required(t('signup.userType.business_name.required')),
      }),
    },
    [4]: {
      inputs: [
        { name: 'business_name', label: 'signup.userType.business_name' },
      ],
      schema: yup.object().shape({
        business_name: yup
          .string()
          .required(t('signup.userType.business_name.required')),
      }),
    },
  }
  const form = userTypeForms[type] || []

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(form.schema),
  })

  const onSubmit = (data: any) => {
    dispatch(setSignupData({ ...data, type }))
    dispatch({ type: ActionType.INCREASE })
  }

  return (
    <>
      <div className={`bg-blue-50 px-4 py-4 rounded-md`}>
        <div className="max-w-sm">
          {form.inputs.map((item: IInputProps) => (
            <Input
              key={item.name}
              required
              label={`${t(item.label)}:`}
              errors={errors[item.name]}
              {...register(item.name)}
            />
          ))}
        </div>
      </div>
      <div className={'flex justify-end'}>
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
      </div>
    </>
  )
}

export default UserDetails
