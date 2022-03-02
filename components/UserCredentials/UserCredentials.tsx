import Input from '@/components/Form/Input'
import { useTranslation } from 'react-i18next'

const INPUTS = [
  {
    name: 'email',
    label: 'signup.userType.email',
  },
  { name: 'password', label: 'signup.userType.password' },
  { name: 're_password', label: 'signup.userType.re_password' },
]

const UserCredentials = () => {
  const { t } = useTranslation()
  const inputs = INPUTS || []
  return (
    <div className={`bg-blue-50 px-4 py-4 rounded-md`}>
      {inputs.map((input: { name: string; label: string }) => (
        <Input key={input.name} name={input.name} label={`${t(input.label)}: *`} />
      ))}
    </div>
  )
}

export default UserCredentials
