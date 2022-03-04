import { useSelector } from 'react-redux'
import { State } from '@/store/types/state.type'

import Spacer from '@/components/Spacer'
import Stepper from '@/components/Stepper'
import UserTypeForm from '@/components/UserTypeForm'
import UserCredentials from '@/components/UserCredentials'

export interface ISignupPageProps {
  resourceType: string
}

const SignupPage = ({ resourceType }: ISignupPageProps) => {
  const steps = useSelector((state: State) => state.steps.steps)
  const activeStep = useSelector((state: State) => state.steps.activeStep)

  const currentComponent =
    activeStep === 0 ? (
      <UserTypeForm />
    ) : (
      <UserCredentials resourceType={resourceType} />
    )

  return (
    <main className="container md:mx-auto">
      <Spacer size="3rem" />
      <Stepper
        activeStep={activeStep}
        steps={steps[resourceType].map((step) => step.label)}
      />
      <Spacer size="4rem" />
      <div className="px-3 ">{currentComponent}</div>
      <Spacer size="4rem" />
    </main>
  )
}

export default SignupPage
