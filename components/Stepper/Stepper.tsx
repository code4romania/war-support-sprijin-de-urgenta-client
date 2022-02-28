import StepperItem from './StepperItem'

export interface Props {
  steps: string[]
  activeStep: number
}

const Stepper = ({ steps, activeStep }: Props) => {
  return (
    <div className="border-gray-100 border-2 px-8 py-4 rounded-md flex items-center">
      {steps.map((step: string, i: number) => (
        <div className="w-1/3" key={`${step}-stepper-item`}>
          <StepperItem
            label={step}
            innerText={`0${i + 1}`}
            completed={activeStep > i}
            active={activeStep === i}
          />
        </div>
      ))}
    </div>
  )
}

export default Stepper
