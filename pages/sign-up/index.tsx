import type { NextPage } from 'next'
import { useSelector } from 'react-redux'
import { State } from '@/store/types/state.type'
import Stepper from '@/components/Stepper'
import UserTypeForm from '@/components/UserTypeForm'
import UserCredentials from '@/components/UserCredentials'
import { UserComponentType } from '@/store/reducers/steps/types'
import SignUpResources from '@/components/SignUpResources'
import clsx from 'clsx'

const SignUp: NextPage = () => {
  const steps = useSelector((state: State) => state.steps.steps)
  const activeStep = useSelector((state: State) => state.steps.activeStep)
  const auth = useSelector((state: State) => !!state.auth.token)
  const currentStep = auth ? 2 : activeStep

  let currentComponent = null

  switch (steps[currentStep].component) {
    case UserComponentType.userType:
      currentComponent = <UserTypeForm />
      break

    case UserComponentType.userData:
      currentComponent = <UserCredentials />
      break

    case UserComponentType.userResources:
      currentComponent = <SignUpResources />
      break;

    default:
      currentComponent = <div></div>
      break
  }

  return (
    <div className={clsx('container', 'md:mx-auto', 'py-4')}>
      <Stepper
        activeStep={activeStep}
        steps={steps.map((step) => step.label)}
      />
      <div className={'mt-12 px-3'}>{currentComponent}</div>
    </div>
  )
}

export default SignUp
