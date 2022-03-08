import { useTranslation } from 'react-i18next'
import { ChangeEvent } from 'react'
import Dropdown from '@/components/Form/Dropdown'
import { UserType } from '@/store/reducers/signup'
import { useUserTypeForm } from '@/hooks/useData'

export interface IUserTypeFormProps {
  resourceType: string
  updateUserType: (userType: number | null) => void
}

const UserTypeForm = ({ updateUserType, resourceType }: IUserTypeFormProps) => {
  const { t } = useTranslation()

  const { data } = useUserTypeForm()
  const userTypeOptions =
    data?.type?.choices.filter(
      (type: any) => resourceType === 'offer' && type.value !== 1
    ) || []

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateUserType(+e.target.value)
  }

  return (
    <>
      <div className="max-w-sm">
        <Dropdown
          name="userType"
          required
          label={`${t('signup.userType.type')}:`}
          onChange={handleChange}
          placeholder={t('signup.userType.type.placeholder')}
        >
          {userTypeOptions.map(({ value, display_name }: UserType) => {
            return (
              <option key={`user-type-option-${value}`} value={value}>
                {display_name}
              </option>
            )
          })}
        </Dropdown>
      </div>
    </>
  )
}

export default UserTypeForm
