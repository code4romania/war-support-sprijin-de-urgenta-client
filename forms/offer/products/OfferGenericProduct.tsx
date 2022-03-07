import ExpireDate from 'forms/common/ExpireDate'
import Location from 'forms/common/Location'
import Product from 'forms/common/Product'
import ProductTypeWrapper from 'forms/common/ProductTypeWrapper'
import Quantity from 'forms/common/Quantity'
import { DonateItemRequest } from 'api'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { MultiSelectOption } from '../../../components/Form/types'
import { useTranslation } from 'react-i18next'
import RadioGroup from '@/components/Form/RadioGroup'
import Radio from '@/components/Form/Radio'
import clsx from 'clsx'
import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
interface IProps {
  counties: MultiSelectOption[]
  category: number
  onSubmit: (values: DonateItemRequest) => void
}

type OfferGenericProductForm = {
  has_transportation?: boolean
  county_coverage: string[]
  town?: string
  name: string
  quantity?: number
  unit_type: string
  packaging_type: string
  expiration_date?: string
}

export const OfferGenericProduct: FC<IProps> = ({ counties, onSubmit, category }) => {
  const { t } = useTranslation('common')
  const genericProductSchema: SchemaOf<OfferGenericProductForm> = yup
    .object()
    .shape({
      county_coverage: yup
        .array()
        .min(1, t('error.county.minOne'))
        .of(yup.string().required()),
      has_transportation: yup
        .boolean()
        .typeError(t('error.must.be.boolean'))
        .required(t('error.has_transportation.required')),
      town: yup.string(),
      name: yup.string().required(t('error.productName.required')),
      quantity: yup.number().min(1, t('error.quantity.minOne')).typeError(t('error.must.be.number')),
      unit_type: yup.string().required(t('error.unitType.required')),
      packaging_type: yup.string().required(t('error.packagkingType.required')),
      expiration_date: yup.mixed().typeError(t('error.must.be.date')),
    })

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<OfferGenericProductForm>({
    resolver: yupResolver(genericProductSchema),
    reValidateMode: 'onSubmit',
    mode: 'all',
    defaultValues: {
      county_coverage: [],
      expiration_date: (new Date()).toISOString().split('T')[0]
    },
  })

  const onFormSubmit = (values: OfferGenericProductForm) => {
    const donateItemRequest: DonateItemRequest = { ...values, category, kind: 'withName' }
    onSubmit(donateItemRequest)
  }

  return (
    <ProductTypeWrapper onSubmit={handleSubmit(onFormSubmit)}>
      <RadioGroup
        label={t('services.offerTransport')}
        errors={errors.has_transportation}
      >
        <div className={clsx('flex flex-row gap-6')}>
          <Radio value="true" {...register('has_transportation')}>
            {t('yes')}
          </Radio>
          <Radio value="false" {...register('has_transportation')}>
            {t('no')}
          </Radio>
        </div>
      </RadioGroup>
      <Location
        counties={counties}
        control={control}
        register={register}
        errors={errors}
        names={{
          county_coverage: 'county_coverage',
          town: 'town',
        }}
      />

      <Product register={register} errors={errors} names={{ name: 'name' }} />

      <Quantity
        register={register}
        errors={errors}
        names={{
          quantity: 'quantity',
          packaging_type: 'packaging_type',
          unit_type: 'unit_type',
        }}
      />

      <ExpireDate
        register={register}
        errors={errors}
        names={{
          expiration_date: 'expiration_date',
        }}
      />
    </ProductTypeWrapper>
  )
}
