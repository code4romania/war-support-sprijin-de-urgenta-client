import Button from '@/components/Button'
import Dropdown from '@/components/Form/Dropdown'
import DropdownMultiSelect from '@/components/Form/DropdownMultiSelect'
import Input from '@/components/Form/Input'
import Radio from '@/components/Form/Radio'
import Date from '@/components/Form/Date'
import RadioGroup from '@/components/Form/RadioGroup'
import { MultiSelectOption } from '@/components/Form/types'
import { useServicesForm } from '@/hooks/useData'
import {
  roIdentityCardRegex,
  phoneNumberRegex,
  roCarRegistrationNumber,
} from '@/utils/regexes'
import { yupResolver } from '@hookform/resolvers/yup'
import { AvailabilityType, TransportServicesRequest, TransportType } from 'api'
import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { SchemaOf } from 'yup'

type ServicesForm = {
  driver_contact: string
  driver_id: string
  driver_name: string
  availability?: string
  availability_interval_from?: Date
  availability_interval_to?: Date
  available_seats?: number
  car_registration_number: string
  category?: string
  county_coverage?: string
  description?: string
  has_disabled_access?: boolean
  has_refrigeration?: boolean
  pets_allowed?: boolean
  type?: string
  weight_capacity?: number
  weight_unit?: string
}

interface ITransportGoodsFormProps {
  onSubmit: (data: TransportServicesRequest) => void
}

export const TransportGoodsForm = ({ onSubmit }: ITransportGoodsFormProps) => {
  const { t } = useTranslation()
  const { data } = useServicesForm()
  const [serverErrors, setServerErrors] = useState<{ [key: string]: string[] }>(
    {}
  )

  const transportGoodsSchema: SchemaOf<ServicesForm> = yup.object().shape({
    availability: yup.string().typeError(t('error.must.be.string')),
    availability_interval_from: yup
      .date()
      .typeError(t('error.must.be.string')),
    availability_interval_to: yup.date().typeError(t('error.must.be.string')),
    available_seats: yup.number().typeError(t('error.must.be.string')),
    car_registration_number: yup
      .string()
      .required(t('error.carRegistration.required'))
      .matches(roCarRegistrationNumber, t('error.driverCI.invalid')),
    category: yup.string().typeError(t('error.must.be.string')),
    county_coverage: yup.string().when('transportType', {
      is: 'county',
      then: yup.string().required(t('error.county.required')),
    }),
    availability: yup.array().of(yup.string().required()),
    driverName: yup.string().required(t('error.driverName.required')),
    driverCI: yup.string().required(t('error.driverCI.required')).matches(roIdentityCardRegex, t('error.driverCI.invalid')),
    carRegistration: yup.string().required(t('error.carRegistration.required')).matches(roIdentityCardRegex, t('error.driverCI.invalid')),
    driverContact: yup.string().required(t('error.driverContact.required')).matches(phoneNumberRegex)
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ServicesForm>({
    defaultValues: {
      weight_capacity: 0,
      availability: []
    },
    resolver: yupResolver(transportGoodsSchema),
    reValidateMode: 'onSubmit',
    mode: 'all',
  })

  const showCountyCoverageDropdown = watch('type') === TransportType.County
  const showAvailabilityIntervals =
    watch('availability') === AvailabilityType.FixedIntervals

  const countiesOptions = useMemo(() => {
    return data?.county_coverage?.choices.map((c: any, idx: number) => (
      <option key={idx} value={c.value}>
        {c.display_name}
      </option>
    ))
  }, [data?.county_coverage?.choices])

  const typeOptions: { value: number; display_name: string }[] =
    data?.type?.choices

  const onAdd = async (data: ServicesForm) => {
    //Preparing object for mutation. The api seems incomplete
    const goodsTransportRequest: TransportServicesRequest = {
      availability: data.availability,
      availability_interval_from: data.availability_interval_from,
      weight_capacity: data.weight_capacity,
      weight_unit: data.weight_unit,
      has_refrigeration: !!data.has_refrigeration,
      type: data.type,
      county_coverage: data.county_coverage,
      driver_name: data.driver_name,
      driver_id: data.driver_id,
      car_registration_number: data.car_registration_number,
      driver_contact: data.driver_contact,
    }

    //TODO: below call is a working post to transport_service, need a hook to POST data
    //TODO: we don't really need to send it upwards, we can POST here since it takes only one entry ATM.
    //TODO: if the API will receive an array then it makes sense to send data upwards
    const response = await fetch(`${process.env.NEXT_PUBLIC_PUBLIC_API}/api/v1/donate/transport_service/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([goodsTransportRequest])
    })
    if(response.ok){
      setServerErrors({})
      const data = await response.json()
      console.log('data', data);
      onSubmit(goodsTransportRequest)
    } else {
      const data = await response.json()
      setServerErrors(data)
      console.log('data', data);
    }
  }

  return (
    <div>
      <form aria-label="form" className="w-full" onSubmit={handleSubmit(onAdd)}>
        <section className="w-full">
          <div className={clsx('flex flex-row items-center space-x-2')}>
            <Input
              type="number"
              label={t('services.capacity')}
              errors={errors['weight_capacity']}
              step="any"
              {...register('weight_capacity')}
            />
            <Input
              label={t('services.weight_unit')}
              errors={errors['weight_unit']}
              {...register('weight_unit')}
            />
          </div>

          <RadioGroup
            errors={errors.has_refrigeration}
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
          <RadioGroup errors={errors.type} label={t('services.transport')}>
            {typeOptions?.map(({ display_name, value }) => (
              <Radio value={value} {...register('type')}>
                {display_name}
              </Radio>
            ))}
            {showCountyCoverageDropdown && (
              <Dropdown
                label={t('services.county_coverage')}
                placeholder={t('services.county.placeholder')}
                {...register('county_coverage')}
              >
                {countiesOptions}
              </Dropdown>
            )}
          </RadioGroup>
          <Input
            labelPosition="horizontal"
            type="text"
            errors={errors.driver_name}
            label={t('services.driver-name')}
            {...register('driver_name')}
          />
          <Input
            labelPosition="horizontal"
            type="text"
            errors={errors.driver_id}
            label={t('services.driver-ci')}
            {...register('driver_id')}
          />
          <Input
            labelPosition="horizontal"
            type="text"
            errors={errors.car_registration_number}
            label={t('services.car-plate')}
            {...register('car_registration_number')}
          />
          <Input
            labelPosition="horizontal"
            type="text"
            errors={errors.driver_contact}
            label={t('services.driverContact')}
            {...register('driver_contact')}
          />
          <Dropdown
            label={t('services.availability')}
            {...register('availability')}
          >
            {data?.availability?.choices.map(
              ({
                display_name,
                value,
              }: {
                display_name: string
                value: string
              }) => {
                return (
                  <option key={value} value={value}>
                    {display_name}
                  </option>
                )
              }
            )}
          </Dropdown>
          {showAvailabilityIntervals && (
            <div className="flex space-x-2">
              <Date
                label={t('services.availability_interval_from')}
                {...register('availability_interval_from')}
              />
              <Date
                label={t('services.availability_interval_to')}
                {...register('availability_interval_to')}
              />
            </div>
          )}
        </section>
        <Button type="submit" text={t('add')} variant="tertiary" size="small" />
      </form>
    </div>
  )
}
