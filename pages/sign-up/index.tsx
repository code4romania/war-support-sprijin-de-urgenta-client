import type { NextPage } from 'next'
import { useSelector } from 'react-redux'

import { State } from '@/store/types/state.type'
import { UserComponentType } from '@/store/reducers/steps/types'
import Stepper from '@/components/Stepper'
import UserTypeForm from '@/components/UserTypeForm'
import UserCredentials from '@/components/UserCredentials'
import SignUpResources from '@/components/SignUpResources'

const componentMap = {
  [UserComponentType.userType]: <UserTypeForm />,
  [UserComponentType.userData]: <UserCredentials />,
  [UserComponentType.userResources]: <SignUpResources />,
}

const SignUp: NextPage = () => {
  const steps = useSelector((state: State) => state.steps.steps)
  const activeStep = useSelector((state: State) => state.steps.activeStep)
  const auth = useSelector((state: State) => !!state.auth.token)

  const currentStep = auth ? 2 : activeStep
  const currentComponent = componentMap[steps[currentStep].component] || <div />

  return (
    <div className="container md:mx-auto py-4">
      <Stepper
        activeStep={currentStep}
        steps={steps.map((step) => step.label)}
      />
      <div className="mt-12 px-3">{currentComponent}</div>
    </div>
  )
}

export default SignUp
