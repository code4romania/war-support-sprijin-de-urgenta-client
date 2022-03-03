import type { NextPage } from 'next'
import { useSelector } from 'react-redux'

import { State } from '@/store/types/state.type'
import { UserComponentType } from '@/store/reducers/steps/types'
import Stepper from '@/components/Stepper'
import UserTypeForm from '@/components/UserTypeForm'
import UserCredentials from '@/components/UserCredentials'
import SignUpResources from '@/components/SignUpResources'
import  Spacer from '@/components/Spacer';

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
    <main className="container md:mx-auto">
      <Spacer size="3rem"/>
      <Stepper
        activeStep={currentStep}
        steps={steps.map((step) => step.label)}
      />
      <Spacer size="4rem"/>
      <div className="px-3 ">{currentComponent}</div>
      <Spacer size="4rem"/>
    </main>
  )
}

export default SignUp
