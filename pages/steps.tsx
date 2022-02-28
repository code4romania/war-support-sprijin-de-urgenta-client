import type { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import StepperButton from '@/components/StepperButton'
import clsx from 'clsx'

const Steps: NextPage = () => {
  const { t } = useTranslation()

  return (
    <div className="px-12 container md:mx-auto">
      <div>Screen</div>
      <div className="mt-4 flex-wrap w-full flex justify-between md:justify-start">
        <div className="flex items-center md:mr-10 cursor-pointer">
          <StepperButton direction="backward">Pasul anterior</StepperButton>
        </div>
        <div className="flex items-center md:ml-10 cursor-pointer">
          <StepperButton direction="forward" disabled>
            Pasul urmator
          </StepperButton>
        </div>
      </div>
    </div>
  )
}

export default Steps
