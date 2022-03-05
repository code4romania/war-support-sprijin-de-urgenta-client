import { useTranslation } from 'react-i18next'
import { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ActionType } from '@/store/reducers/steps'
import Dropdown from '../Form/Dropdown'
import { UserType } from '@/store/reducers/signup'
import UserDetails from '@/components/UserDetails'
import StepperButtonGroup from '@/components/StepperButton/StepperButtonGroup'
import { useUserTypeForm } from '@/hooks/useData'

const UserTypeForm = () => {
  const { t } = useTranslation()
  const [userType, setUserType] = useState<number | null>()
  const dispatch = useDispatch()
  const { data } = useUserTypeForm()
  const userTypeOptions = data?.type.choices || []

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setUserType(+e.target.value)
  }

  const handleBack = () => {
    setUserType(null)
  }

  const handleSubmit = () => {
    dispatch({ type: ActionType.INCREASE })
  }

  return !userType ? (
    <>
      <div className={'bg-blue-50 px-4 py-4 rounded-md'}>
        <div className="max-w-sm">
          <Dropdown
            name="userType"
            label={`${t('signup.userType.type')}: *`}
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
