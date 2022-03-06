import Button from '@/components/Button'
import Dropdown from '@/components/Form/Dropdown'
import DropdownMultiSelect from '@/components/Form/DropdownMultiSelect'
import Input from '@/components/Form/Input'
import Radio from '@/components/Form/Radio'
import Date from '@/components/Form/Date'
import Textarea from '@/components/Form/Textarea'
import RadioGroup from '@/components/Form/RadioGroup'
import { useServicesForm } from '@/hooks/useData'
import {
  phoneNumberRegex,
  roCarRegistrationNumber,
  roIdentityCardRegex,
} from '@/utils/regexes'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  AvailabilityType,
  TransportServicesRequest,
  TransportType,
  TransportCategories,
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
  driver_contact: string
  driver_id: string
  driver_name: string
  availability?: string
  availability_interval_from?: Date
  availability_interval_to?: Date
  car_registration_number: string
  category?: string
  county_coverage?: string[]
  description?: string
  has_refrigeration?: boolean
  type?: string
  weight_capacity?: number
  weight_unit?: string
}

interface IRequestTransportGoodsFormProps {
  onSubmit: (data: TransportServicesRequest) => void
}

export const RequestTransportGoodsForm = ({
  onSubmit,
}: IRequestTransportGoodsFormProps) => {
  const { t } = useTranslation()
  const { data } = useServicesForm(FormPageProps.Request)
  const [serverErrors, setServerErrors] = useState<{ [key: string]: string[] }>(
    {}
  )

  const transportGoodsSchema: SchemaOf<ServicesForm> = yup.object().shape({
    availability: yup
      .string()
      .required('error.availability.required')
      .typeError(t('error.must.be.string')),
    availability_interval_from: yup.mixed().typeError(t('error.must.be.time')),
    availability_interval_to: yup.mixed().typeError(t('error.must.be.time')),
    car_registration_number: yup
      .string()
      .required(t('error.carRegistration.required'))
      .matches(roCarRegistrationNumber, t('error.carRegistation.invalid')),
    category: yup.string().typeError(t('error.must.be.string')),
    county_coverage: yup.array().when('type', {
      is: TransportType.County,
      then: yup
        .array()
        .min(1, t('error.county.minOne'))
        .of(yup.string().required()),
    }),
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
    has_refrigeration: yup
      .boolean()
      .typeError(t('error.must.be.boolean'))
      .required(t('error.has_refrigeration.required')),
    type: yup.string(),
    weight_unit: yup.string().typeError(t('error.must.be.string')),
    weight_capacity: yup.number().typeError(t('error.must.be.number')),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<ServicesForm>({
    defaultValues: {
      weight_capacity: 0,
      county_coverage: [],
    },
    resolver: yupResolver(transportGoodsSchema),
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
    console.log('onAdd', data)
    //Preparing object for mutation. The api seems incomplete
    const goodsTransportRequest: TransportServicesRequest = {
      availability: data.availability,
      availability_interval_from: data.availability_interval_from,
      availability_interval_to: data.availability_interval_to,
      weight_capacity: data.weight_capacity,
      weight_unit: data.weight_unit,
      has_refrigeration: !!data.has_refrigeration,
      type: data.type,
      county_coverage: data.county_coverage,
      driver_name: data.driver_name,
      driver_id: data.driver_id,
      car_registration_number: data.car_registration_number,
      driver_contact: data.driver_contact,
      description: data.description,
      category: TransportCategories.Goods,
    }

    onSubmit(goodsTransportRequest)
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
        body: JSON.stringify([goodsTransportRequest]),
      }
    )
    if (response.ok) {
      setServerErrors({})
      const data = await response.json()
      console.log('data', data)
      onSubmit(goodsTransportRequest)
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
          <div className={clsx('flex flex-row items-center space-x-2')}>
            <Input
              type="number"
              label={t('services.capacity')}
              errors={
                serverErrors['weight_capacity']
                  ? { message: serverErrors['weight_capacity'].join('\n') }
                  : errors['weight_capacity']
              }
              step="any"
              {...register('weight_capacity')}
            />
            <Input
              label={t('services.weight_unit')}
              errors={
                serverErrors['weight_unit']
                  ? { message: serverErrors['weight_unit'].join('\n') }
                  : errors['weight_unit']
              }
              {...register('weight_unit')}
            />
          </div>
          <RadioGroup
            errors={
              serverErrors['has_refrigeration']
                ? { message: serverErrors['has_refrigeration'].join('\n') }
                : errors['has_refrigeration']
            }
            label={t('services.cooling')}
          >
            <div className={clsx('flex flex-row gap-6')}>
              <Radio value="true" {...register('has_refrigeration')}>
                {t('yes')}
              </Radio>
              <Radio value="false" {...register('has_refrigeration')}>
                {t('no')}
              </Radio>
            </div>
          </RadioGroup>
          <Dropdown
            {...register('county_coverage')}
            className={clsx('w-1/2 mb-4')}
            label={t('signup.other.county_coverage')}
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
            {...register('county_coverage')}
            className={clsx('w-1/2 mb-4')}
            label={t('signup.other.county_coverage')}
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
