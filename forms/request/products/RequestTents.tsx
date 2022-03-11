import Input from '@/components/Form/Input'
import Radio from '@/components/Form/Radio'
import RadioGroup from '@/components/Form/RadioGroup'
import { RequestItemRequestWithoutName } from 'api'

import ProductTypeWrapper from 'forms/common/ProductTypeWrapper'

import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { MultiSelectOption } from '../../../components/Form/types'
import RequestLocation from './RequestLocation'
import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

interface IProps {
  counties?: MultiSelectOption[]
  category: number
  onSubmit: (values: RequestItemRequestWithoutName) => void
}
type RequestTentsForm = {
  county_coverage: string
  town?: string
  quantity?: number
  tent_capacity: number
  has_transportation?: boolean
}

export const RequestTents: FC<IProps> = ({ counties, category, onSubmit }) => {
  const { t } = useTranslation()
  const tentsRequestSchema: SchemaOf<RequestTentsForm> = yup.object().shape({
    county_coverage: yup
    .string()
    .typeError(t('error.must.be.string'))
    .required(t('error.county.required')),
    has_transportation: yup
      .boolean()
      .typeError(t('error.must.be.boolean'))
      .required(t('error.has_transportation.required')),
    town: yup.string(),
    quantity: yup
    .number()
    .typeError(t('error.must.be.number'))
    .min(1, t('error.quantity.minOne')),
    tent_capacity: yup
      .number()
      .integer(t('error.integer'))
      .min(1, t('error.quantity.minOne'))
      .typeError(t('error.must.be.number'))
      .required(t('error.tentCapacity.required')),
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<RequestTentsForm>({
    resolver: yupResolver(tentsRequestSchema),
    reValidateMode: 'onSubmit',
    mode: 'all',
    defaultValues: {}
  })

  const onFormSubmit = (values: RequestTentsForm) => {
    const donateItemRequest: RequestItemRequestWithoutName = {
      ...values,
      category,
      unit_type: 'tent',
      kind: 'noName',
      name: 'tent'
    }
    onSubmit(donateItemRequest)
  }

  return (
    <ProductTypeWrapper onSubmit={handleSubmit(onFormSubmit)}>
      <RadioGroup
        label={t('services.offerTransport')}
        errors={errors.has_transportation}>
        <div className="flex flex-row gap-6">
          <Radio value="true" {...register('has_transportation')}>
            {t('yes')}
          </Radio>
          <Radio value="false" {...register('has_transportation')}>
            {t('no')}
          </Radio>
        </div>
      </RadioGroup>
      <Input
        type="number"
        {...register('quantity')}
        errors = {errors.quantity}
        label={t('signup.products.qty')}
        labelPosition="horizontal"
      />
      <Input
        type="number"
        label={t('signup.products.capacity')}
        labelPosition="horizontal"
        placeholder={t('signup.products.persons')}
        errors = {errors.tent_capacity}
        {...register('tent_capacity')}
      />

      <RequestLocation
        counties={counties}
        register={register}
        errors={errors}
        control={control}
        names={{
          county_coverage: 'county_coverage',
          town: 'town',
        }}
      />
    </ProductTypeWrapper>
  )
}
