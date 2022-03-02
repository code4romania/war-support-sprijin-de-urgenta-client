import { useTranslation } from 'react-i18next'
import { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ActionType } from '@/store/reducers/steps'
import Dropdown from '../Form/Dropdown'
import { UserType, userTypeOptions } from '@/store/reducers/signup'
import UserDetails from '@/components/UserDetails'
import StepperButtonGroup from '@/components/StepperButton/StepperButtonGroup'

const UserTypeForm = () => {
  const { t } = useTranslation()
  const [userType, setUserType] = useState<string>()
  const dispatch = useDispatch()

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setUserType(e.target.value)
  }

  const handleBack = () => {
    setUserType('')
  }

  const handleSubmit = () => {
    dispatch({ type: ActionType.INCREASE })
  }

  return !userType ? (
    <>
      <div className={`bg-blue-50 px-4 py-4 rounded-md`}>
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
      </div>
      <StepperButtonGroup
        steps={[
          {
            disabled: !userType,
            direction: 'backward',
            onClick: handleBack,
          },
          {
            disabled: !userType,
            direction: 'forward',
            onClick: handleSubmit,
          },
        ]}
      />
    </>
  ) : (
    <UserDetails type={userType} onClickBack={handleBack} />
  )
}

export default UserTypeForm
