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
  ServerError,
  ServerErrorByEndpoint,
  TransportServicesRequest,
} from 'api'
import endpoints from 'endpoints.json'
import i18n from 'i18next'
import { FormPageProps } from '../FormPage/FormPage'
import ServerErrorsMessage from '../ServerErrorsMessage'

export interface ISignUpResources {
  type: FormPageProps.Offer | FormPageProps.Request
}

const SignUpResources = ({ type }: ISignUpResources) => {
  const { t } = useTranslation()
  const { categories } = useSelector((state: State) => state)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [selectedResourceTypes, setSelectedResourceTypes] = useState<string[]>(
    []
  )
  const [servicesList, setServicesList] = useState<TransportServicesRequest[]>(
    []
  )

  const [serverErrors, setServerErrors] = useState<ServerErrorByEndpoint>({});

  const removeItem = (array: any[], index: number) => {
    const newArray = [...array]
    newArray.splice(index, 1)
    return newArray
  }
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

  const [othersList, setOthersList] = useState<DonateOtherRequest[]>([])
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
          type={type}
          items={servicesList}
          onAddItem={onAddService}
          onRemoveItem={onRemoveService}
        />
      ),
      products: () => (
        <SignUpProducts
          type={type}
          items={productsList}
          onAddItem={onAddProduct}
          onRemoveItem={onRemoveProduct}
        />
      ),
      volunteer: () => (
        <SignupVolunteering
          type={type}
          items={volunteeringList}
          onAddItem={onAddVolunteeringItem}
          onRemoveItem={onRemoveVolunteeringItem}
        />
      ),
      others: () => (
        <OtherResourcesForm
          type={type}
          items={othersList}
          onAddItem={onAddOtherItem}
          onRemoveItem={onRemoveOtherItem}
        />
      ),
      default: () => (
        <OtherResourcesForm
          type={type}
          items={othersList}
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
      if (!response.ok) {
        const responseJson = await response.json();
        const error: ServerError = Object.assign({}, {
          endpoint,
          error: responseJson,
          status: response.status,
          statusText: response.statusText
        });
        return Promise.reject(error);
      }
      return Promise.resolve(response);
    });
  }

  const handleSubmit = async () => {
    const serverErrors: ServerErrorByEndpoint = {};

    if (servicesList.length) {
      try {
        await onSubmit(servicesList, endpoints['donate/transport_service'])
      }
      catch (e: any) {
        serverErrors[e.endpoint] = e.error
      }
    }
    if (productsList.length) {
      try {
        await onSubmit(productsList, endpoints['donate/item'])
      }
      catch (e: any) {
        serverErrors[e.endpoint] = e.error
      }
    }
    if (volunteeringList.length) {
      try {
        await onSubmit(volunteeringList, endpoints['donate/volunteering'])
      } catch (e: any) {
        serverErrors[e.endpoint] = e.error
        console.log(serverErrors)
      }
    }
    if (othersList.length) {
      try {
        await onSubmit(othersList, endpoints['donate/other'])
      }
      catch (e: any) {
        serverErrors[e.endpoint] = e.error
      }
    }

    if (Object.keys(serverErrors).length === 0) {
      setSubmitSuccess(true)
      setSelectedResourceTypes([])
    } else {
      setServerErrors(serverErrors);
    }
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
      {Object.keys(serverErrors).length > 0 && <ServerErrorsMessage errors={serverErrors} />}
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
