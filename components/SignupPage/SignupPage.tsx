import { useSelector } from 'react-redux'
import { State } from '@/store/types/state.type'

import Spacer from '@/components/Spacer'
import Stepper from '@/components/Stepper'
import UserTypeForm from '@/components/UserTypeForm'
import UserCredentials from '@/components/UserCredentials'
import SignupOffer from '@/components/SignupOffer'
import { useState } from 'react'
import StepperButtonGroup from '@/components/StepperButton/StepperButtonGroup'
import UserDetails from '@/components/UserDetails'

export interface ISignupPageProps {
  resourceType: string
}

const SignupPage = ({ resourceType }: ISignupPageProps) => {
  const [userType, setUserType] = useState<number | null>()

  const handleBack = () => {
    setUserType(null)
  }

  const steps = useSelector((state: State) => state.steps.steps)
  const activeStep = useSelector((state: State) => state.steps.activeStep)

  return (
    <main className="container px-2 mx-auto">
      <Spacer size="3rem" />
      <Stepper
        activeStep={activeStep}
        steps={steps[resourceType].map((step) => step.label)}
      />
      <Spacer size="4rem" />
      {activeStep === 0 ? (
        !userType ? (
          <>
            <div className={'bg-blue-50 px-2 px-10 py-8 rounded-md'}>
              {resourceType === 'offer' ? (
                <SignupOffer>
                  <UserTypeForm
                    resourceType="offer"
                    updateUserType={setUserType}
                  />
                </SignupOffer>
              ) : (
                <div className="px-3 ">
                  <UserTypeForm
                    resourceType="request"
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
      ) : (
        <UserCredentials resourceType={resourceType} />
      )}

      <Spacer size="4rem" />
    </main>
  )
}

export default SignupPage
