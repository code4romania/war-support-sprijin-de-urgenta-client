import { useSelector } from 'react-redux'
import { State } from '@/store/types/state.type'
import { UserComponentType } from '@/store/reducers/steps/types'
import Spacer from '@/components/Spacer'
import Stepper from '@/components/Stepper'
import UserTypeForm from '@/components/UserTypeForm'
import UserCredentials from '@/components/UserCredentials'

export interface ISignupPageProps {
  resourceType: string
}

const componentMap = {
  [UserComponentType.userType]: <UserTypeForm />,
  [UserComponentType.userData]: <UserCredentials />,
}

const SignupPage = ({ resourceType }: ISignupPageProps) => {
  const steps = useSelector((state: State) => state.steps.steps)
  const activeStep = useSelector((state: State) => state.steps.activeStep)
  const type = resourceType === 'offer' ? 'offer' : 'request'

  const currentComponent =
    activeStep === 0
      ? componentMap[UserComponentType.userType]
      : componentMap[UserComponentType.userData]

  return (
    <main className="container md:mx-auto">
      <Spacer size="3rem" />
      <Stepper
        activeStep={activeStep}
        steps={steps[type].map((step) => step.label)}
      />
      <Spacer size="4rem" />
      <div className="px-3 ">{currentComponent}</div>
      <Spacer size="4rem" />
    </main>
  )
}

export default SignupPage
