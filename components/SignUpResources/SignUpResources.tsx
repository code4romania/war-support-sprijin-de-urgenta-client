import { State } from '@/store/types/state.type'
import { useCallback, useState } from 'react'
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
import { DonateItemRequest, DonateOtherRequest, DonateVolunteeringRequest, TransportServicesRequest } from 'api'
import endpoints from 'endpoints.json'
import i18n from 'i18next'

const SignUpResources = ({ type }: { type: string }) => {
  const { t } = useTranslation()
  const { categories } = useSelector((state: State) => state)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const [selectedResourceTypes, setSelectedResourceTypes] = useState<string[]>([])
  const [servicesList, setServicesList] = useState<TransportServicesRequest[]>([])
  const [productsList, setProductsList] = useState<DonateItemRequest[]>([])
  const [volunteeringItemsList, setVolunteeringItemsList] = useState<DonateVolunteeringRequest[]>([])
  const [donateOtherItemsList, setDonateOtherItemsList] = useState<DonateOtherRequest[]>([])

  const onAddService = (data: TransportServicesRequest) => {
    setServicesList((state) => [...state, data])
  }

  const onAddProduct = (data: DonateItemRequest) => {
    setProductsList((state) => [...state, data])
  }

  const onAddVolunteeringItem = (data: DonateVolunteeringRequest) => {
    setVolunteeringItemsList((state) => [...state, data])
  }

  const onAddOtherItem = (data: DonateOtherRequest) => {
    setDonateOtherItemsList((state) => [...state, data])
  }

  const resourceTypeBuilder = ({ resourceType }: { resourceType: string }) => {
    const componentMap = {
      services: () => (
        <SignUpServicesForm
          onAddGoodItem={onAddService}
          onAddPersonItem={onAddService}
        />
      ),
      products: () => <SignUpProducts onAddItem={onAddProduct} />,
      volunteer: () => <SignupVolunteering onAddItem={onAddVolunteeringItem} />,
      others: () => <OtherResourcesForm onAddItem={onAddOtherItem} />,
      default: () => <OtherResourcesForm onAddItem={onAddOtherItem} />,
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
    values: TransportServicesRequest[] | DonateItemRequest[] | DonateVolunteeringRequest[] | DonateOtherRequest[],
    endpoint: string
  ) => {
    try {
      return await fetch(`${process.env.NEXT_PUBLIC_PUBLIC_API}/${i18n.language}${endpoint}`, {
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
      }).then(async (response) => {
        if (response.status >= 400 && response.status < 600) {
          const responseJson = await response.json();
          const error = Object.assign({}, {
            error: responseJson,
            status: response.status,
            statusText: response.statusText
          });
          return Promise.reject(error);
        }
        return Promise.resolve(response);
      });
    }
    catch (e: any) {
      const requestError: Record<string, any> = {};
      requestError[endpoint] = e;
      Promise.reject(requestError);
    }
  }

  const handleSubmit = async () => {
    if (servicesList.length) {
      await onSubmit(servicesList, endpoints['donate/transport_service'])
    }
    if (productsList.length) {
      await onSubmit(productsList, endpoints['donate/item'])
    }
    if (volunteeringItemsList.length) {
      await onSubmit(volunteeringItemsList, endpoints['donate/volunteering'])
    }
    if (donateOtherItemsList.length) {
      await onSubmit(donateOtherItemsList, endpoints['donate/other'])
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
