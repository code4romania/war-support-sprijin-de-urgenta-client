import { useTranslation } from 'react-i18next'
import { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ActionType } from '@/store/reducers/steps'
import Dropdown from '../Form/Dropdown'
import { setUserType, UserType, userTypeOptions } from '@/store/reducers/signup'
import UserDetails from '@/components/UserDetails'

const UserTypeForm = () => {
  const { t } = useTranslation()
  const [userType, setUserType] = useState<string>()
  const dispatch = useDispatch()

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // dispatch(setUserType(e.target.value as UserType))
    setUserType(e.target.value)
    // dispatch({ type: ActionType.INCREASE })
  }

  return (
    <div
      className={`bg-blue-50 px-4 py-4 rounded-md`}
      // style={{ height: `${userTypeOptions.length * 50 + 5}px` }}
    >
      {!userType ? (
        <Dropdown
          name="userType"
          label={t('signup.userType.type')}
          onChange={handleChange}
        >
          {userTypeOptions.map((option: UserType, idx: number) => {
            return (
              <option key={`user-type-option-${idx}`} value={option}>
                {t(`signup.userType.options.${idx}`)}
              </option>
            )
          })}
        </Dropdown>
      ) : (
        <UserDetails type={userType} />
      )}
    </div>
  )
}

export default UserTypeForm
