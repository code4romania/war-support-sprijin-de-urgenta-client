import StepperButton from '@/components/StepperButton/index'
import { useTranslation } from 'react-i18next'

const StepperButtonGroup = ({ steps }: any) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-wrap justify-start w-full mt-8 md:justify-start">
      {steps.map((step: any) => (
        <div key={step.direction} onClick={step.onClick}>
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
