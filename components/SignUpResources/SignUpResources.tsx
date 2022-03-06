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
import {
  DonateItemRequest,
  DonateOtherRequest,
  DonateVolunteeringRequest,
  TransportServicesRequest,
} from 'api'
import endpoints from 'endpoints.json'
import i18n from 'i18next'

const removeItem = (array: any[], index: number) => {
  let newArray = [...array]
  return newArray.splice(index, 1)
}

const SignUpResources = ({ type }: { type: string }) => {
  const { t } = useTranslation()
  const { categories } = useSelector((state: State) => state)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const [selectedResourceTypes, setSelectedResourceTypes] = useState<string[]>(
    []
  )

  const [servicesList, setServicesList] = useState<TransportServicesRequest[]>(
    []
  )
  const onAddService = (data: TransportServicesRequest) => {
    setServicesList((state) => [...state, data])
  }
  const onRemoveService = (index: number) => {
    setServicesList(removeItem(servicesList, index))
  }

  const [productsList, setProductsList] = useState<DonateItemRequest[]>([])
  const onAddProduct = (data: DonateItemRequest) => {
    setProductsList((state) => [...state, data])
  }
  const onRemoveProduct = (index: number) => {
    setProductsList(removeItem(productsList, index))
  }

  const [volunteeringList, setVolunteeringList] = useState<
    DonateVolunteeringRequest[]
  >([])
  const onAddVolunteeringItem = (data: DonateVolunteeringRequest) => {
    setVolunteeringList((state) => [...state, data])
  }
  const onRemoveVolunteeringItem = (index: number) => {
    setVolunteeringList(removeItem(volunteeringList, index))
  }

  const [othersList, setOthersList] = useState<DonateOtherRequest[]>(
    []
  )
  const onAddOtherItem = (data: DonateOtherRequest) => {
    setOthersList((state) => [...state, data])
  }
  const onRemoveOtherItem = (index: number) => {
    setOthersList(removeItem(othersList, index))
  }

  const resourceTypeBuilder = ({ resourceType }: { resourceType: string }) => {
    const componentMap = {
      services: () => (
        <SignUpServicesForm
          items={servicesList}
          onAddItem={onAddService}
          onRemoveItem={onRemoveService}
        />
      ),
      products: () => (
        <SignUpProducts
          onAddItem={onAddProduct}
          onRemoveItem={onRemoveProduct}
        />
      ),
      volunteer: () => (
        <SignupVolunteering
          onAddItem={onAddVolunteeringItem}
          onRemoveItem={onRemoveVolunteeringItem}
        />
      ),
      others: () => (
        <OtherResourcesForm
          onAddItem={onAddOtherItem}
          onRemoveItem={onRemoveOtherItem}
        />
      ),
      default: () => (
        <OtherResourcesForm
          onAddItem={onAddOtherItem}
          onRemoveItem={onRemoveOtherItem}
        />
      ),
    }
    return (
      componentMap[resourceType as keyof typeof componentMap] ||
      componentMap.default
    )()
  }

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

  const onSubmit = async (
    values:
      | TransportServicesRequest[]
      | DonateItemRequest[]
      | DonateVolunteeringRequest[]
      | DonateOtherRequest[],
    endpoint: string
  ) => {
    try {
      return await fetch(
        `${process.env.NEXT_PUBLIC_PUBLIC_API}/${i18n.language}${endpoint}`,
        {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(values),
        }
      ).then(async (response) => {
        if (response.status >= 400 && response.status < 600) {
          const responseJson = await response.json()
          const error = Object.assign(
            {},
            {
              error: responseJson,
              status: response.status,
              statusText: response.statusText,
            }
          )
          return Promise.reject(error)
        }
        return Promise.resolve(response)
      })
    } catch (e: any) {
      const requestError: Record<string, any> = {}
      requestError[endpoint] = e
      Promise.reject(requestError)
    }
  }

  const handleSubmit = async () => {
    if (servicesList.length) {
      await onSubmit(servicesList, endpoints['donate/transport_service'])
    }
    if (productsList.length) {
      await onSubmit(productsList, endpoints['donate/item'])
    }
    if (volunteeringList.length) {
      await onSubmit(volunteeringList, endpoints['donate/volunteering'])
    }
    if (othersList.length) {
      await onSubmit(othersList, endpoints['donate/other'])
    }

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
