import Input from '@/components/Form/Input'
import { userTypeForms, UserType } from '@/store/reducers/signup'
import { useTranslation } from 'react-i18next'
export interface IUserDetailsProps {
  type: string
}

export interface IInputProps {
  name: string
  label: string
}

const UserDetails = ({ type }: IUserDetailsProps) => {
  const { t } = useTranslation()
  const inputs = userTypeForms[type as keyof typeof userTypeForms] || []
  return (
    <div className={`bg-blue-50 px-4 py-4 rounded-md`}>
      {inputs.map((item: IInputProps) => (
        <Input name={item.name} label={`${t(item.label)}: *`} />
      ))}
    </div>
  )
}

export default UserDetails
