import { useSelector } from 'react-redux'
import { State } from '@/store/types/state.type'

import Spacer from '@/components/Spacer'
import Stepper from '@/components/Stepper'
import UserCredentials from '@/components/UserCredentials'
import { useState } from 'react'
import SignupUserType from '@/components/SignupUserType'
import { FormPageProps } from '@/components/FormPage/FormPage'

export interface ISignupPageProps {
  resourceType: FormPageProps
}

const SignupPage = ({ resourceType }: ISignupPageProps) => {
  const [userType, setUserType] = useState<number | null>()

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
        <SignupUserType resourceType={resourceType} userType={userType} setUserType={setUserType} />
      ) : (
        <UserCredentials resourceType={resourceType} />
      )}
      <Spacer size="4rem" />
    </main>
  )
}

export default SignupPage
