import Stepper from '@/components/Stepper'
import SignUpResources from '@/components/SignUpResources'
import { useSelector } from 'react-redux'
import { State } from '@/store/types/state.type'
import Spacer from '@/components/Spacer'

interface IFormPageProps {
  type: 'offer' | 'request'
}

const FormPage = ({ type }: IFormPageProps) => {
  const steps = useSelector((state: State) => state.steps.steps)

  return (
    <main className="container md:mx-auto">
      <Spacer size="3rem"/>
      <Stepper activeStep={2} steps={steps[type].map((step) => step.label)} />
      <Spacer size="4rem"/>
      <SignUpResources type={type} />
      <Spacer size="4rem"/>
    </main>
  )
}

export default FormPage
