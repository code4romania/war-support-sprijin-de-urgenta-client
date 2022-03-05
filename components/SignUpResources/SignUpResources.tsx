import { State } from '@/store/types/state.type'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Checkbox from '../Form/Checkbox'
import OtherResourcesForm from '../OtherResourcesForm'
import SignUpProducts from '../SignUpProducts'
import { SignUpServicesForm } from '../SignUpServicesForm'
import SignupVolunteering from '../SignupVolunteering'
import StepperButtonGroup from '@/components/StepperButton/StepperButtonGroup'
import Spacer from '@/components/Spacer'
import ThankYouMessage from '../ThankYouMessage'

const resourceTypeBuilder = ({ resourceType }: { resourceType: string }) => {
  const componentMap = {
    services: () => <SignUpServicesForm />,
    products: () => <SignUpProducts />,
    volunteer: () => <SignupVolunteering />,
    others: () => <OtherResourcesForm />,
    default: () => <OtherResourcesForm />,
  }
  return (
    componentMap[resourceType as keyof typeof componentMap] ||
    componentMap.default
  )()
}

const SignUpResources = ({ type }: { type: string }) => {
  const { t } = useTranslation()
  const { categories } = useSelector((state: State) => state)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const [selectedResourceTypes, setSelectedResourceTypes] = useState<string[]>(
    []
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    const value = event.target.value
    setSubmitSuccess(false)

    if (isChecked && !selectedResourceTypes.includes(value))
      setSelectedResourceTypes([...selectedResourceTypes, value])
    else if (!isChecked && selectedResourceTypes.includes(value))
      setSelectedResourceTypes(
        selectedResourceTypes.filter((id) => id !== value)
      )
  }

  const handleSubmit = () => {
    setSubmitSuccess(true)
    setSelectedResourceTypes([])
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col px-8 rounded-md py-7 bg-blue-50">
        <h3 className="mb-4 text-xl font-semibold">
          {t(`signup.resources.${type}`)} *
        </h3>
        {categories.map(({ slug }) => (
          <div key={slug}>
            <Checkbox
              onChange={(event) => handleChange(event)}
              name="resource"
              value={slug}
              checked={selectedResourceTypes.includes(slug)}
            >
              <span className="text-base">{t(slug)}</span>
            </Checkbox>
          </div>
        ))}
        <p className="mt-8 text-sm font-semibold text-gray-500">
          {t('signup.resources.fillInDetails')}
        </p>
      </div>
      {selectedResourceTypes.length > 0 &&
        selectedResourceTypes.map((resourceType) => (
          <div key={resourceType} className="w-full">
            {resourceTypeBuilder({ resourceType })}
          </div>
        ))}
      {submitSuccess && <ThankYouMessage type={type} />}
      <Spacer size={'1em'} />
      <StepperButtonGroup
        steps={[
          { disabled: true, direction: 'backward' },
          {
            disabled: selectedResourceTypes.length === 0,
            direction: 'forward',
            onClick: handleSubmit,
          },
        ]}
      />
    </div>
  )
}

export default SignUpResources
