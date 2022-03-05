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

const resourceTypeBuilder = (id: string) => {
  const dictionary = {
    services: () => <SignUpServicesForm />,
    products: () => <SignUpProducts />,
    volunteer: () => <SignupVolunteering />,
    others: () => <OtherResourcesForm />,
    default: () => <OtherResourcesForm />,
  }
  return (dictionary[id as keyof typeof dictionary] || dictionary.default)()
}

const SignUpResources = ({ type }: { type: string }) => {
  const { t } = useTranslation()
  const { categories } = useSelector((state: State) => state)

  const [selectedResourceIds, setSelectedResourceIds] = useState<string[]>([])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    const value = event.target.value

    if (isChecked && !selectedResourceIds.includes(value))
      setSelectedResourceIds([...selectedResourceIds, value])
    else if (!isChecked && selectedResourceIds.includes(value))
      setSelectedResourceIds(selectedResourceIds.filter((id) => id !== value))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col px-8 rounded-md py-7 bg-blue-50">
        <h3 className="mb-4 text-lg font-semibold">
          {t(`signup.resources.${type}`)} *
        </h3>
        {categories.map(({ slug }) => (
          <div key={slug}>
            <Checkbox
              onChange={(event) => handleChange(event)}
              name="resource"
              value={slug}
              checked={selectedResourceIds.includes(slug)}
            >
              {t(slug)}
            </Checkbox>
          </div>
        ))}
        <p className="mt-8 text-sm font-semibold text-gray-500">
          {t('signup.resources.fillInDetails')}
        </p>
      </div>
      {selectedResourceIds.length > 0 &&
        selectedResourceIds.map((id) => (
          <div key={id} className="w-full">
            {resourceTypeBuilder(id)}
          </div>
        ))}
      <Spacer size={'1em'}/>
      <StepperButtonGroup
        steps={[
          { disabled: true, direction: 'backward'},
          {
            disabled: selectedResourceIds.length === 0,
            direction: 'forward',
          },
        ]}
      />
    </div>
  )
}

export default SignUpResources
