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
  roIdentityCardRegex,
  phoneNumberRegex,
  roCarRegistrationNumber,
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
  county_coverage?: string[]
  description?: string
  has_disabled_access?: boolean
  pets_allowed: boolean
  type?: string
}

interface IOfferTransportPersonsFormProps {
  onSubmit: (data: TransportServicesRequest) => void
}

export const OfferTransportPersonsForm = ({
  onSubmit,
}: IOfferTransportPersonsFormProps) => {
  const { t } = useTranslation()
  const { data } = useServicesForm(FormPageProps.Offer)

  const transportPersonsSchema: SchemaOf<ServicesForm> = yup.object().shape({
    available_seats: yup
      .number()
      .typeError(t('error.must.be.number'))
      .required(),
    availability: yup.string()
    .required(t('error.availability.required'))
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
    has_disabled_access: yup
      .boolean()
      .typeError(t('error.must.be.boolean'))
      .required(t('error.boolean.required')),
    pets_allowed: yup
      .boolean()
      .typeError(t('error.must.be.boolean'))
      .required(t('error.boolean.required')),
    type: yup.string().typeError(t('validation.required')),
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
      county_coverage: [],
    },
    resolver: yupResolver(transportPersonsSchema),
    reValidateMode: 'onSubmit',
    mode: 'all',
  })

  const showCountyCoverageDropdown = watch('type') === TransportType.County
  const showAvailabilityIntervals =
    watch('availability') === AvailabilityType.FixedIntervals

  const countiesOptions = useMemo(() => {
    return data?.county_coverage?.choices.map((c: any) => ({
      value: c.value,
      label: c.display_name,
    }))
  }, [data?.county_coverage?.choices])

  const typeOptions: { value: number; display_name: string }[] =
    data?.type?.choices

  const onAdd = async (data: ServicesForm) => {
    const personsTransportRequest: TransportServicesRequest = {
      available_seats: data.available_seats,
      availability: data.availability,
      availability_interval_from: data.availability_interval_from,
      availability_interval_to: data.availability_interval_to,
      has_disabled_access: !!data.has_disabled_access,
      pets_allowed: !!data.pets_allowed,
      type: data.type,
      county_coverage: data.county_coverage,
      driver_name: data.driver_name,
      driver_id: data.driver_id,
      car_registration_number: data.car_registration_number,
      driver_contact: data.driver_contact,
      description: data.description,
      category: TransportCategories.People,
    }

    onSubmit(personsTransportRequest)
  }

  return (
    <div>
      <form aria-label="form" className="w-full" onSubmit={handleSubmit(onAdd)}>
        <section className="w-full">
          <div className={clsx('flex flex-row items-center space-x-2')}>
            <Input
              type="number"
              label={t('services.available_seats')}
              errors={errors['available_seats']}
              step="any"
              {...register('available_seats')}
            />
          </div>
          <RadioGroup
            errors={errors['has_disabled_access']}
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
            errors={errors['pets_allowed']}
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
          <RadioGroup errors={errors['type']} label={t('services.transport')}>
            <Radio
              value={typeOptions && typeOptions[0].value}
              {...register('type')}
            >
              {typeOptions && typeOptions[0].display_name}
            </Radio>
            <Radio
              value={typeOptions && typeOptions[1]?.value}
              {...register('type')}
              className={clsx('!mb-0')}
            >
              {typeOptions && typeOptions[1].display_name}
            </Radio>
            {showCountyCoverageDropdown && (
              <DropdownMultiSelect
                {...register('county_coverage')}
                className={clsx('mb-4')}
                disabled={!showCountyCoverageDropdown}
                control={control}
                options={countiesOptions || []}
                errors={errors.county_coverage}
              />
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
            errors={errors.availability}
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
                type={'time'}
                label={t('services.availability_interval_from')}
                errors={errors['availability_interval_from']}
                {...register('availability_interval_from')}
              />
              <Date
                type={'time'}
                label={t('services.availability_interval_to')}
                errors={errors['availability_interval_to']}
                {...register('availability_interval_to')}
              />
            </div>
          )}
          <Textarea
            label={t('services.description')}
            {...register('description')}
          />
        </section>
        <Button type="submit" text={t('add')} variant="tertiary" size="small" />
      </form>
    </div>
  )
}
