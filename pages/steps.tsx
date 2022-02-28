import type { NextPage } from 'next'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import StepperButton from '@/components/StepperButton'
import { State } from 'store/types/state.type'
import { ActionType } from 'store/reducers/steps'
import Stepper from '@/components/Stepper'

const Steps: NextPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const activeStep = useSelector((state: State) => state.steps.activeStep)
  const steps = useSelector((state: State) => state.steps.steps)
  const currentComponent = steps[activeStep].component

  const handleStepForward = () => {
    dispatch({ type: ActionType.INCREASE })
  }

  const handleStepBackward = () => {
    dispatch({ type: ActionType.DECREASE })
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
          className="flex items-center md:mr-10 md:w-44"
        >
          {activeStep !== 0 && (
            //StepperButton has prop disabled
            <StepperButton direction="backward">
              {t('steps.backward')}
            </StepperButton>
          )}
        </div>
        <div
          onClick={handleStepForward}
          className="flex items-center justify-end md:ml-10 md:w-44"
        >
          {activeStep !== steps.length - 1 && (
            <StepperButton direction="forward">
              {t('steps.forward')}
            </StepperButton>
          )}
        </div>
      </div>
    </div>
  )
}

export default Steps
