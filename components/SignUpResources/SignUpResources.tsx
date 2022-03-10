import Spacer from '@/components/Spacer'
import StepperButtonGroup from '@/components/StepperButton/StepperButtonGroup'
import { State } from '@/store/types/state.type'
import {
  DonateItemRequestUnion,
  DonateOtherRequest,
  DonateVolunteeringRequest,
  ItemRequestUnion,
  ServerError,
  ServerErrorByEndpoint,
  TransportServicesRequest,
} from 'api'
import endpoints from 'endpoints.json'
import i18n from 'i18next'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Checkbox from '../Form/Checkbox'
import { Required } from '../Form/common'
import { FormPageProps } from '../FormPage/FormPage'
import OtherResourcesForm from '../OtherResourcesForm'
import ServerErrorsMessage from '../ServerErrorsMessage'
import SignUpProducts from '../SignUpProducts'
import { SignUpServicesForm } from '../SignUpServicesForm'
import SignupVolunteering from '../SignupVolunteering'
import ThankYouMessage from '../ThankYouMessage'

export interface ISignUpResources {
  type: FormPageProps.Offer | FormPageProps.Request
}

const isEmpty = (array: any[]) => array.length === 0

const SignUpResources = ({ type }: ISignUpResources) => {
  const { t } = useTranslation()
  const { categories } = useSelector((state: State) => state)
  const { userPk, token } = useSelector((state: State) => state.auth)
  const donor = userPk
  const made_by = userPk
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [selectedResourceTypes, setSelectedResourceTypes] = useState<string[]>(
    []
  )
  const [servicesList, setServicesList] = useState<TransportServicesRequest[]>(
    []
  )
  const [shouldSubmit, setShouldSubmit] = useState(false)

  const [serverErrors, setServerErrors] = useState<ServerErrorByEndpoint>({})

  const removeItem = (array: any[], index: number) => {
    const newArray = [...array]
    newArray.splice(index, 1)
    return newArray
  }

  const onAddService = async (data: TransportServicesRequest) => {
    if (data.kind === FormPageProps.Offer) {
      setServicesList((state) => [...state, { ...data, donor }])
    } else if (data.kind === FormPageProps.Request) {
      setServicesList([{ ...data, made_by }])
      setShouldSubmit(true)
    }
  }

  const onRemoveService = (index: number) => {
    setServicesList(removeItem(servicesList, index))
  }

  const [productsList, setProductsList] = useState<
    DonateItemRequestUnion[] | ItemRequestUnion[]
  >([])

  const onAddProduct = (data: DonateItemRequestUnion | ItemRequestUnion) => {
    if (type === FormPageProps.Offer) {
      setProductsList((state) => [...state, { ...data, donor }])
    } else {
      setProductsList([{ ...data, made_by }])
      setShouldSubmit(true)
    }
  }

  const onRemoveProduct = (index: number) => {
    setProductsList(removeItem(productsList, index))
  }

  const [volunteeringList, setVolunteeringList] = useState<
    DonateVolunteeringRequest[]
  >([])
  const onAddVolunteeringItem = (data: DonateVolunteeringRequest) => {
    if (type === FormPageProps.Offer) {
      setVolunteeringList((state) => [...state, { ...data, donor }])
    } else {
      setVolunteeringList([{ ...data, made_by }])
      setShouldSubmit(true)
    }
  }
  const onRemoveVolunteeringItem = (index: number) => {
    setVolunteeringList(removeItem(volunteeringList, index))
  }

  const [othersList, setOthersList] = useState<DonateOtherRequest[]>([])
  const onAddOtherItem = (data: DonateOtherRequest) => {
    if (type === FormPageProps.Offer) {
      setOthersList((state) => [...state, { ...data, donor }])
    } else {
      setOthersList([{ ...data, made_by }])
      setShouldSubmit(true)
    }
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
      | DonateItemRequestUnion[]
      | DonateVolunteeringRequest[]
      | DonateOtherRequest[]
      | ItemRequestUnion[],
    endpoint: string
  ) => {
    return await fetch(
      `${process.env.NEXT_PUBLIC_PUBLIC_API}/${i18n.language}${endpoint}`,
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(values),
      }
    ).then(async (response) => {
      if (!response.ok) {
        const responseJson = await response.json()
        const error: ServerError = Object.assign(
          {},
          {
            endpoint,
            error: responseJson,
            status: response.status,
            statusText: response.statusText,
          }
        )
        return Promise.reject(error)
      }
      return Promise.resolve(response)
    })
  }

  const handleSubmit = useCallback(async () => {
    setServerErrors({})

    const serverErrors: ServerErrorByEndpoint = {}

    if (!isEmpty(servicesList)) {
      try {
        await onSubmit(
          servicesList,
          type === FormPageProps.Offer
            ? endpoints['donate/transport_service']
            : endpoints['request/transport_service']
        )
        setServicesList([])
      } catch (e: any) {
        const error: any[] = e.error
        error.forEach((err, index) => {
          if (!isEmpty(Object.keys(err))) {
            servicesList.splice(index, 1)
            setServicesList([...servicesList])
          }
        })
        serverErrors[e.endpoint] = e.error
      }
    }
    if (!isEmpty(productsList)) {
      try {
        await onSubmit(
          productsList,
          type === FormPageProps.Offer
            ? endpoints['donate/item']
            : endpoints['request/item']
        )
        setProductsList([])
      } catch (e: any) {
        const error: any[] = e.error
        error.forEach((err, index) => {
          if (!isEmpty(Object.keys(err))) {
            productsList.splice(index, 1)
            setProductsList([...productsList])
          }
        })
        serverErrors[e.endpoint] = e.error
      }
    }
    if (!isEmpty(volunteeringList)) {
      try {
        await onSubmit(
          volunteeringList,
          type === FormPageProps.Offer
            ? endpoints['donate/volunteering']
            : endpoints['request/volunteering']
        )
        setVolunteeringList([])
      } catch (e: any) {
        const error: any[] = e.error
        error.forEach((err, index) => {
          if (!isEmpty(Object.keys(err))) {
            volunteeringList.splice(index, 1)
            setVolunteeringList([...volunteeringList])
          }
        })
        serverErrors[e.endpoint] = e.error
      }
    }
    if (!isEmpty(othersList)) {
      try {
        await onSubmit(
          othersList,
          type === FormPageProps.Offer
            ? endpoints['donate/other']
            : endpoints['request/other']
        )
        setOthersList([])
      } catch (e: any) {
        const error: any[] = e.error
        error.forEach((err, index) => {
          if (!isEmpty(Object.keys(err))) {
            othersList.splice(index, 1)
            setOthersList([...othersList])
          }
        })
        serverErrors[e.endpoint] = e.error
      }
    }

    if (isEmpty(Object.keys(serverErrors))) {
      setSubmitSuccess(true)
      setSelectedResourceTypes([])
    } else {
      setServerErrors(serverErrors)
    }
  }, [othersList, productsList, servicesList, type, volunteeringList])

  useEffect(() => {
    const update = async () => {
      await handleSubmit()
      setShouldSubmit(false)
    }
    if (
      shouldSubmit &&
      (!isEmpty(servicesList) ||
        !isEmpty(othersList) ||
        !isEmpty(volunteeringList) ||
        !isEmpty(productsList))
    ) {
      update()
    }
  }, [
    shouldSubmit,
    othersList,
    productsList,
    servicesList,
    volunteeringList,
    handleSubmit,
  ])

  return (
    <div className="space-y-4">
      <div className="flex flex-col px-8 rounded-md py-7 bg-blue-50">
        <h3 className="mb-4 text-xl font-semibold">
          {t(`signup.resources.${type}`)}
          <Required />
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
      {!isEmpty(selectedResourceTypes) &&
        selectedResourceTypes.map((resourceType) => (
          <div key={resourceType} className="w-full">
            {resourceTypeBuilder({ resourceType })}
          </div>
        ))}
      {submitSuccess && <ThankYouMessage type={type} />}
      {!isEmpty(Object.keys(serverErrors)) && (
        <ServerErrorsMessage errors={serverErrors} />
      )}
      <Spacer size={'1em'} />
      <StepperButtonGroup
        steps={[
          { disabled: true, direction: 'backward' },
          {
            disabled: isEmpty(selectedResourceTypes),
            direction: 'forward',
            onClick: handleSubmit,
          },
        ]}
      />
    </div>
  )
}

export default SignUpResources
