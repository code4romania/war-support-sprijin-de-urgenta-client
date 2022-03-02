import Input from '@/components/Form/Input'
import Checkbox from '@/components/Form/Checkbox'

const INPUTS = [
  {
    name: 'username',
    label: 'Nume utilizator',
  },
  { name: 'password', label: 'Parola' },
  { name: 'confirmPassword', label: 'Confirma Parola' },
]

const UserCredentials = () => {
  const inputs = INPUTS || []
  return (
    <div className={`bg-blue-50 px-4 py-4 rounded-md`}>
      {inputs.map((input: { name: string; label: string }) => (
        <Input name={input.name} label={input.label} />
      ))}
      <Checkbox name={'rememberMe'}>Tine-ma minte</Checkbox>
    </div>
  )
}

export default UserCredentials
