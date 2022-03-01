import type { NextPage } from 'next'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import StepperButton from '@/components/StepperButton'
import { State } from '@/store/types/state.type'
import { ActionType } from '@/store/reducers/steps'
import Stepper from '@/components/Stepper'
import UserTypeForm from '@/components/UserTypeForm'
import { UserComponentType } from '@/store/reducers/steps/types'

const Register: NextPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const activeStep = useSelector((state: State) => state.steps.activeStep)
  const steps = useSelector((state: State) => state.steps.steps)

  const handleStepForward = () => {
    dispatch({ type: ActionType.INCREASE })
  }

  const handleStepBackward = () => {
    dispatch({ type: ActionType.DECREASE })
  }

  let currentComponent = null;

  switch (steps[activeStep].component) {
    case UserComponentType.userType:
      currentComponent = <UserTypeForm />
      break;

    default:
      currentComponent = <div></div>
      break;
  }

  return (
    <div className="px-2 md:px-12 container md:mx-auto">
      <Stepper
        activeStep={activeStep}
        steps={steps.map((step) => step.label)}
      />
      <div className={'mt-12'}>{currentComponent}</div>
      <div className="mt-8 justify-start flex-wrap w-full flex justify-between md:justify-start">
        <div
          onClick={handleStepBackward}
          className="flex items-center md:mr-6 md:w-44"
        >
          <StepperButton disabled={activeStep === 0} direction="backward">
            {t('steps.backward')}
          </StepperButton>
        </div>
        <div
          onClick={handleStepForward}
          className="flex items-center justify-end md:ml-6 md:w-44"
        >
          <StepperButton
            disabled={activeStep === steps.length - 1}
            direction="forward"
          >
            {t('steps.forward')}
          </StepperButton>
        </div>
      </div>
    </div>
  )
}

export default Register
