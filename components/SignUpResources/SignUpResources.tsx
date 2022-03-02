import { CategoryNames } from '@/store/reducers/categories/types'
import { State } from '@/store/types/state.type'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Checkbox from '../Form/Checkbox'
import OtherResourcesForm from '../OtherResourcesForm'
import SignUpProducts from '../SignUpProducts'
import { SignUpServicesFormWithModal } from '../SignUpServicesForm'
import SignupVolunteering from '../SignupVolunteering'

const SignUpResources = () => {
  const { t } = useTranslation()
  const defaultOffer = useSelector((state: State) => state.defaultOffer)
  const { categories } = useSelector((state: State) => state)
  
  // we will store the resources the user has inputted in this object, identifying them by their category name
  const [currentResources, setCurrentResources] = useState<{
    [key in CategoryNames]?: any
  }>({});

  const [selectedResourceIds, setSelectedResourceIds] = useState(
    defaultOffer ? [defaultOffer] : []
  )

  const resourceTypeBuilder = (id: string) => {
    const dictionary = {
      services: () => <SignUpServicesFormWithModal />,
      products: () => <SignUpProducts />,
      volunteer: () => <SignupVolunteering />,
      others: () => <OtherResourcesForm currentValue={currentResources?.others} handleChange={getChangeHandlerForResourceCategory(CategoryNames.OTHERS)}/>,
      default: () => <OtherResourcesForm currentValue={currentResources?.others} handleChange={getChangeHandlerForResourceCategory(CategoryNames.OTHERS)}/>,
    }
    return (dictionary[id as keyof typeof dictionary] || dictionary.default)()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    const value = event.target.value

    if (isChecked && !selectedResourceIds.includes(value))
      setSelectedResourceIds([...selectedResourceIds, value])
    else if (!isChecked && selectedResourceIds.includes(value))
      setSelectedResourceIds(selectedResourceIds.filter((id) => id !== value))
  }
  
  // given a resource name it will return a change handler that updates the given resource in the state
  const getChangeHandlerForResourceCategory = (resourceName: string) => {
    return (newValue: any) => {
      setCurrentResources({
        ...currentResources,
        [resourceName]: newValue,
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col px-8 rounded-md py-7 bg-blue-50">
        <h3 className="mb-4 text-lg font-semibold">
          {t('signup.resources.offer')} *
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
    </div>
  )
}

export default SignUpResources
