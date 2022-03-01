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
    <div className="container px-2 md:px-12 md:mx-auto">
      <Stepper
        activeStep={activeStep}
        steps={steps.map((step) => step.label)}
      />
      <div className={'mt-12'}>
        {(() => {
          switch (currentComponent) {
            case 'UserType':
              return <div>User Type Component</div>
            case 'UserData':
              return <div>User Data Component</div>
            case 'Resources':
              return <div>Resources Component</div>
          }
        })()}
      </div>
      <div className="flex flex-wrap justify-between w-full mt-8 md:justify-start">
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

export default Steps
