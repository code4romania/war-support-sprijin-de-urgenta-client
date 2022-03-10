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

interface IProps {
  counties?: MultiSelectOption[]
  category: number
  onSubmit: (values: RequestItemRequestWithoutName) => void
}
type RequestTentsForm = {
  county_coverage: string
  town: string
  quantity: number
  tent_capacity: number
  unit_type: string
}

export const RequestTents: FC<IProps> = ({ counties, category, onSubmit }) => {
  const { t } = useTranslation()
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<RequestTentsForm>()

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
      <Input
        type="number"
        {...register('quantity')}
        label={t('signup.products.qty')}
        labelPosition="horizontal"
      />
      <Input
        type="number"
        label={t('signup.products.capacity')}
        labelPosition="horizontal"
        placeholder={t('signup.products.persons')}
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
