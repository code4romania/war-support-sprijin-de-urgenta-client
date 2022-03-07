import Button from '@/components/Button'
import Dropdown from '@/components/Form/Dropdown'
import Input from '@/components/Form/Input'
import Radio from '@/components/Form/Radio'
import Date from '@/components/Form/Date'
import Textarea from '@/components/Form/Textarea'
import RadioGroup from '@/components/Form/RadioGroup'
import { useServicesForm } from '@/hooks/useData'
import {
  roIdentityCardRegex,
  phoneNumberRegex,
  roCarRegistrationNumber,
} from '@/utils/regexes'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  TransportServicesRequest,
  TransportType,
  TransportCategories,
  RequestTransportServicesRequest,
} from 'api'
import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { SchemaOf } from 'yup'
import i18n from 'i18next'
import endpoints from 'endpoints.json'
import { FormPageProps } from '@/components/FormPage/FormPage'

type ServicesForm = {
  available_seats: number
  driver_contact: string
  driver_id: string
  driver_name: string
  availability?: string
  availability_interval_from?: Date
  availability_interval_to?: Date
  car_registration_number: string
  category?: string
  from_county: string
  from_city: string
  to_county: string
  to_city: string
  description?: string
  has_disabled_access?: boolean
  pets_allowed: boolean
  type?: string
}

interface IRequestTransportPersonsFormProps {
  onSubmit: (data: TransportServicesRequest) => void
}

export const RequestTransportPersonsForm = ({
  onSubmit,
}: IRequestTransportPersonsFormProps) => {
  const { t } = useTranslation()
  const { data } = useServicesForm(FormPageProps.Request)
  const [serverErrors, setServerErrors] = useState<{ [key: string]: string[] }>(
    {}
  )

  const transportPersonsSchema: SchemaOf<ServicesForm> = yup.object().shape({
    available_seats: yup
      .number()
      .typeError(t('error.must.be.number'))
      .required(),
    availability: yup.string().typeError(t('error.must.be.string')),
    availability_interval_from: yup.mixed().typeError(t('error.must.be.time')),
    availability_interval_to: yup.mixed().typeError(t('error.must.be.time')),
    car_registration_number: yup
      .string()
      .required(t('error.carRegistration.required'))
      .matches(roCarRegistrationNumber, t('error.driverCI.invalid')),
    category: yup.string().typeError(t('error.must.be.string')),
    from_county: yup
      .string()
      .required('error.county.required')
      .typeError(t('error.must.be.string')),
    from_city: yup
      .string()
      .required('error.town.required')
      .typeError(t('error.must.be.string')),
    to_county: yup
      .string()
      .required('error.county.required')
      .typeError(t('error.must.be.string')),
    to_city: yup
      .string()
      .required('error.town.required')
      .typeError(t('error.must.be.string')),
    description: yup.string().typeError(t('error.must.be.string')),
    driver_name: yup.string().required(t('error.driverName.required')),
    driver_id: yup
      .string()
      .required(t('error.driverCI.required'))
      .matches(roIdentityCardRegex, t('error.driverCI.invalid')),
    driver_contact: yup
      .string()
      .required(t('error.driverContact.required'))
      .matches(phoneNumberRegex, t('error.driverContact.invalid')),
    has_disabled_access: yup
      .boolean()
      .typeError(t('error.must.be.boolean'))
      .required(t('error.boolean.required')),
    pets_allowed: yup
      .boolean()
      .typeError(t('error.must.be.boolean'))
      .required(t('error.boolean.required')),
    type: yup.string(),
    weight_unit: yup.string().typeError(t('error.must.be.string')),
    weight_capacity: yup.number().typeError(t('error.must.be.number')),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServicesForm>({
    resolver: yupResolver(transportPersonsSchema),
    reValidateMode: 'onSubmit',
    mode: 'all',
  })

  const countiesFromOptions = useMemo(() => {
    return (
      data?.from_county?.choices.map((c: any) => ({
        value: c.value,
        label: c.display_name,
      })) || []
    )
  }, [data?.from_county?.choices])

  const countiesToOptions = useMemo(() => {
    return (
      data?.to_county?.choices.map((c: any) => ({
        value: c.value,
        label: c.display_name,
      })) || []
    )
  }, [data?.to_county?.choices])

  const onAdd = async (data: ServicesForm) => {
    //Preparing object for mutation. The api seems incomplete
    const personsTransportRequest: RequestTransportServicesRequest = {
      available_seats: data.available_seats,
      availability: data.availability,
      availability_interval_from: data.availability_interval_from,
      availability_interval_to: data.availability_interval_to,
      has_disabled_access: !!data.has_disabled_access,
      pets_allowed: !!data.pets_allowed,
      type: data.type,
      from_county: data.from_county,
      from_city: data.from_city,
      to_county: data.to_county,
      to_city: data.to_city,
      driver_name: data.driver_name,
      driver_id: data.driver_id,
      car_registration_number: data.car_registration_number,
      driver_contact: data.driver_contact,
      description: data.description,
      category: TransportCategories.People,
    }

    onSubmit(personsTransportRequest)
    return false

    //TODO: below call is a working post to transport_service, need a hook to POST data
    //TODO: we don't really need to send it upwards, we can POST here since it takes only one entry ATM.
    //TODO: if the API will receive an array then it makes sense to send data upwards
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PUBLIC_API}/${i18n.language}${endpoints['donate/transport_service']}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([personsTransportRequest]),
      }
    )
    if (response.ok) {
      setServerErrors({})
      const data = await response.json()
      console.log('data', data)
      onSubmit(personsTransportRequest)
    } else {
      const data = await response.json()
      setServerErrors(data)
      console.log('data', data)
    }
  }

  return (
    <div>
      <form aria-label="form" className="w-full" onSubmit={handleSubmit(onAdd)}>
        <section className="w-full">
          <Textarea
            label={t('services.description')}
            {...register('description')}
          />
          <RadioGroup
            errors={
              serverErrors['has_disabled_access']
                ? { message: serverErrors['has_disabled_access'].join('\n') }
                : errors['has_disabled_access']
            }
            label={t('services.has_disabled_access')}
          >
            <div className={clsx('flex flex-row gap-6')}>
              <Radio value="true" {...register('has_disabled_access')}>
                {t('yes')}
              </Radio>
              <Radio value="false" {...register('has_disabled_access')}>
                {t('no')}
              </Radio>
            </div>
          </RadioGroup>
          <RadioGroup
            errors={
              serverErrors['pets_allowed']
                ? { message: serverErrors['pets_allowed'].join('\n') }
                : errors['pets_allowed']
            }
            label={t('services.pets_allowed')}
          >
            <div className={clsx('flex flex-row gap-6')}>
              <Radio value="true" {...register('pets_allowed')}>
                {t('yes')}
              </Radio>
              <Radio value="false" {...register('pets_allowed')}>
                {t('no')}
              </Radio>
            </div>
          </RadioGroup>
          <Dropdown
            {...register('from_county')}
            className={clsx('w-1/2 mb-4')}
            label={t('services.from_county')}
          >
            {countiesFromOptions.length > 0 &&
              countiesFromOptions.map(
                ({ value, label }: { value: string; label: string }) => (
                  <option key={`${value}_${label}`} value={value}>
                    {label}
                  </option>
                )
              )}
          </Dropdown>
          <Input
            name="town"
            className={'w-1/2'}
            label={t('signup.other.town')}
          />
          <Dropdown
            {...register('to_county')}
            className={clsx('w-1/2 mb-4')}
            label={t('services.to_county')}
          >
            {countiesToOptions.length > 0 &&
              countiesToOptions.map(
                ({ value, label }: { value: string; label: string }) => (
                  <option key={`${value}_${label}`} value={value}>
                    {label}
                  </option>
                )
              )}
          </Dropdown>
          <Input
            name="town"
            className={'w-1/2'}
            label={t('signup.other.town')}
          />
        </section>
        <Button type="submit" text={t('add')} variant="tertiary" size="small" />
      </form>
    </div>
  )
}
