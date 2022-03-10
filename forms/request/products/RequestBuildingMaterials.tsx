import clsx from 'clsx'


import Product from 'forms/common/Product'
import ProductTypeWrapper from 'forms/common/ProductTypeWrapper'
import Quantity from 'forms/common/Quantity'
import Radio from '@/components/Form/Radio'
import RadioGroup from '@/components/Form/RadioGroup'
import { RequestItemRequest } from 'api'
import { FC } from 'react'
import { MultiSelectOption } from '../../../components/Form/types'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import RequestLocation from './RequestLocation'

interface IProps {
  counties: MultiSelectOption[]
  category: number
  onSubmit: (values: RequestItemRequest) => void
}

type RequestBuildingMaterialsForm = {
  county_coverage: string
  town: string
  name: string
  quantity: number
  unit_type: string
  packaging_type: string
  expiration_date: string
  has_transportation: boolean
}

export const RequestBuildingMaterials: FC<IProps> = ({
  counties,
  category,
  onSubmit,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<RequestBuildingMaterialsForm>()

  const onFormSubmit = (values: RequestBuildingMaterialsForm) => {
    const donateItemRequest: RequestItemRequest = { ...values, kind: 'withName', category }
    onSubmit(donateItemRequest)
  }

  const { t } = useTranslation()

  return (
    <ProductTypeWrapper onSubmit={handleSubmit(onFormSubmit)}>
      <RadioGroup label={t('services.offerTransport')}>
        <div className={clsx('flex flex-row gap-6')}>
          <Radio value="true" {...register('has_transportation')}>
            {t('yes')}
          </Radio>
          <Radio value="false" {...register('has_transportation')}>
            {t('no')}
          </Radio>
        </div>
      </RadioGroup>
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
      <Product errors={errors} register={register} names={{ name: 'name' }} />

      <Quantity
        errors={errors}
        register={register}
        names={{
          quantity: 'quantity',
          packaging_type: 'packaging_type',
          unit_type: 'unit_type',
        }}
      />
    </ProductTypeWrapper>
  )
}
