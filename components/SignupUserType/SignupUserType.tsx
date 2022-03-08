import SignupOffer from '@/components/SignupOffer'
import UserTypeForm from '@/components/UserTypeForm'
import StepperButtonGroup from '@/components/StepperButton/StepperButtonGroup'
import UserDetails from '@/components/UserDetails'
import { FormPageProps } from '@/components/FormPage/FormPage'

export interface ISignupUserTypeProps {
  resourceType: FormPageProps
  userType?: number | null
  setUserType: (userType: number | null) => void
}

const SignupUserType = ({
  resourceType,
  userType,
  setUserType,
}: ISignupUserTypeProps) => {
  const handleBack = () => {
    setUserType(null)
  }

  return !userType ? (
    <>
      <div className={'bg-blue-50 px-2 px-10 py-8 rounded-md'}>
        {resourceType === 'offer' ? (
          <SignupOffer>
            <UserTypeForm
              resourceType={FormPageProps.Offer}
              updateUserType={setUserType}
            />
          </SignupOffer>
        ) : (
          <div className="px-3 ">
            <UserTypeForm
              resourceType={FormPageProps.Request}
              updateUserType={setUserType}
            />
          </div>
        )}
      </div>
      <div className={'flex justify-end'}>
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
            },
          ]}
        />
      </div>
    </>
  ) : (
    <UserDetails type={userType} onClickBack={handleBack} />
  )
}

export default SignupUserType
