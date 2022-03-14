import Button from '@/components/Button'
import Date from '@/components/Form/Date'
import Dropdown from '@/components/Form/Dropdown'
import DropdownMultiSelect from '@/components/Form/DropdownMultiSelect'
import Input from '@/components/Form/Input'
import Radio from '@/components/Form/Radio'
import RadioGroup from '@/components/Form/RadioGroup'
import Textarea from '@/components/Form/Textarea'
import { FormPageProps } from '@/components/FormPage/FormPage'
import { useServicesForm } from '@/hooks/useData'
import { State } from '@/store/types/state.type'
import {
  phoneNumberRegex,
  roCarRegistrationNumber,
  roIdentityCardRegex,
} from '@/utils/regexes'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  AvailabilityType,
  OfferTransportServicesRequest,
  TransportCategories,
  TransportType,
} from 'api'
import clsx from 'clsx'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { dateRangeValidator } from 'forms/validators'

type ServicesForm = {
  driver_contact: string
  driver_id: string
  driver_name: string
  availability?: string
  availability_interval_from?: string
  availability_interval_to?: string
  car_registration_number: string
  category?: string
  county_coverage?: string[]
  description?: string
  has_refrigeration?: boolean
  type?: string
  weight_capacity?: number
  weight_unit?: string
}

interface IOfferTransportGoodsFormProps {
  onSubmit: (data: OfferTransportServicesRequest) => void
}

export const OfferTransportGoodsForm = ({
  onSubmit,
}: IOfferTransportGoodsFormProps) => {
  const { t } = useTranslation()
  const token: string = useSelector((state: State) => state.auth.token)
  const { data } = useServicesForm(FormPageProps.Offer, token)

  const transportGoodsSchema: SchemaOf<ServicesForm> = yup.object().shape({
    availability: yup
      .string()
      .required(t('error.availability.required'))
      .typeError(t('error.must.be.string')),
    availability_interval_from: yup.mixed().typeError(t('error.must.be.time')),
    availability_interval_to: yup.mixed().when('availability', {
      is: AvailabilityType.FixedIntervals,
      then: yup
        .mixed()
        .typeError(t('error.must.be.time'))
        .test(
          dateRangeValidator.name,
          t('error.must.be.greater.than.from'),
          dateRangeValidator.test
        ),
    }),
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
      .required(t('validation.required')),
    type: yup.string().typeError(t('validation.required')),
    weight_unit: yup
      .string()
      .required(t('validation.required'))
      .typeError(t('error.must.be.string')),
    weight_capacity: yup
      .number()
      .moreThan(0, t('error.value.must.be.non.zero'))
      .required(t('validation.required'))
      .typeError(t('error.must.be.number')),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<ServicesForm>({
    defaultValues: {
      weight_capacity: 1,
      county_coverage: [],
    },
    resolver: yupResolver(transportGoodsSchema),
    reValidateMode: 'onSubmit',
    mode: 'all',
  })

  const showCountyCoverageDropdown = watch('type') === TransportType.County
  const countyCoverage = watch('county_coverage')
  console.log(countyCoverage)
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
    const goodsTransportRequest: OfferTransportServicesRequest = {
      kind: FormPageProps.Offer,
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
  }

  return (
    <div>
      <form aria-label="form" className="w-full" onSubmit={handleSubmit(onAdd)}>
        <section className="w-full">
          <div className={clsx('flex flex-row items-center space-x-2')}>
            <Input
              required
              type="number"
              label={t('services.capacity')}
              errors={errors['weight_capacity']}
              step="any"
              {...register('weight_capacity')}
            />
            <Input
              required
              label={t('services.weight_unit')}
              errors={errors['weight_unit']}
              {...register('weight_unit')}
            />
          </div>
          <RadioGroup
            required
            errors={errors['has_refrigeration']}
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
          <RadioGroup errors={errors['type']} label={t('services.transport')}>
            <Radio
              value={typeOptions && typeOptions[0].value}
              {...register('type')}
            >
              {typeOptions && t(typeOptions[0].display_name)}
            </Radio>
            <Radio
              value={typeOptions && typeOptions[1]?.value}
              {...register('type')}
              className={clsx('!mb-0')}
            >
              {typeOptions && t(typeOptions[1].display_name)}
            </Radio>
            {showCountyCoverageDropdown && (
              <DropdownMultiSelect
                required
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
            required
            labelPosition="horizontal"
            type="text"
            errors={errors.driver_name}
            label={`${t('services.driver-name')}:`}
            {...register('driver_name')}
          />
          <Input
            required
            labelPosition="horizontal"
            type="text"
            errors={errors.driver_id}
            label={t('services.driver-ci')}
            {...register('driver_id')}
          />
          <Input
            required
            labelPosition="horizontal"
            type="text"
            errors={errors.car_registration_number}
            label={t('services.car-plate')}
            {...register('car_registration_number')}
          />
          <Input
            required
            labelPosition="horizontal"
            type="text"
            errors={errors.driver_contact}
            label={t('services.driverContact')}
            {...register('driver_contact')}
          />
          <Dropdown
            required
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
                    {t(display_name)}
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
