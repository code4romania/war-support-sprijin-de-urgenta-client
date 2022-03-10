import Location from 'forms/request/products/RequestLocation'
import Product from 'forms/common/Product'
import ProductTypeWrapper from 'forms/common/ProductTypeWrapper'
import Quantity from 'forms/common/Quantity'
import { RequestItemRequest } from 'api'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { MultiSelectOption } from '../../../components/Form/types'
import { useTranslation } from 'react-i18next'
import Textarea from '@/components/Form/Textarea'
import RadioGroup from '@/components/Form/RadioGroup'
import Radio from '@/components/Form/Radio'
import RequestLocation from 'forms/request/products/RequestLocation'

interface IProps {
  counties: MultiSelectOption[]
  category: number
  onSubmit: (values: RequestItemRequest) => void
}

type RequestGenericProductForm = {
  county_coverage: string
  town: string
  name: string
  description: string
  quantity: number
  unit_type: string
  packaging_type: string
  expiration_date: string
  has_transportation: boolean
}

export const RequestGenericProduct: FC<IProps> = ({ counties, onSubmit, category }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<RequestGenericProductForm>()

  const onFormSubmit = (values: RequestGenericProductForm) => {
    const donateItemRequest: RequestItemRequest = { ...values, category, kind: 'withName' }
    onSubmit(donateItemRequest)
  }

  const { t } = useTranslation()

  return (
    <ProductTypeWrapper onSubmit={handleSubmit(onFormSubmit)}>
      <RadioGroup label={t('services.offerTransport')}>
        <div className="flex flex-row gap-6">
          <Radio value="true" {...register('has_transportation')}>
            {t('yes')}
          </Radio>
          <Radio value="false" {...register('has_transportation')}>
            {t('no')}
          </Radio>
        </div>
      </RadioGroup>
      <Product register={register} errors={errors} names={{ name: 'name' }} />

      <Textarea {...register('description')} label={t('signup.products.description')} />

      <Quantity
        register={register}
        errors={errors}
        names={{
          quantity: 'quantity',
          packaging_type: 'packaging_type',
          unit_type: 'unit_type',
        }}
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
