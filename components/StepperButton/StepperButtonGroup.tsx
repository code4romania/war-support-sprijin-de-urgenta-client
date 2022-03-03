import StepperButton from '@/components/StepperButton/index'
import { useTranslation } from 'react-i18next'

const StepperButtonGroup = ({ steps }: any) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-wrap justify-start sm:justify-between w-full mt-8">
      {steps.map((step: any) => (
        <div
          key={step.direction}
          onClick={!step.disabled ? step.onClick : null}
        >
          <StepperButton disabled={step.disabled} direction={step.direction}>
            {t(
              step.direction === 'backward' ? 'steps.backward' : 'steps.forward'
            )}
          </StepperButton>
        </div>
      ))}
    </div>
  )
}

export default StepperButtonGroup
