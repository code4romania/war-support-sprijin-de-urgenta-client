import Textarea from '@/components/Form/Textarea'
import Product from 'forms/common/Product'
import Location from 'forms/common/Location'
import ProductTypeWrapper from 'forms/common/ProductTypeWrapper'
import { DonateItemRequest } from 'api'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import RadioGroup from '@/components/Form/RadioGroup'
import Radio from '@/components/Form/Radio'
import clsx from 'clsx'
import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { MultiSelectOption } from '@/components/Form/types'
import Quantity from '../../common/Quantity'

interface IProps {
  counties: MultiSelectOption[]
  category: number
  onSubmit: (values: DonateItemRequest) => void
}

type OfferProductsOthersForm = {
  county_coverage: string[]
  has_transportation: boolean
  unit_type: string
  name: string
  description?: string
  quantity?: number
  packaging_type?: string
  town?: string
}

export const OfferProductsOthers: FC<IProps> = ({ counties, onSubmit, category }) => {
  const { t } = useTranslation()

  const othersSchema: SchemaOf<OfferProductsOthersForm> = yup.object().shape({
    county_coverage: yup
      .array()
      .min(1, t('error.county.minOne'))
      .of(yup.string().required()),
    town: yup.string().typeError(t('error.must.be.string')),
    has_transportation: yup
      .boolean()
      .typeError(t('error.must.be.boolean'))
      .required(t('error.has_transportation.required')),
    name: yup.string().required(t('error.productName.required')),
    unit_type: yup.string().required(t('error.unitType.required')),
    description: yup.string().typeError(t('error.must.be.string')),
    quantity: yup.number().typeError(t('error.must.be.number')),
    packaging_type: yup.string().typeError(t('error.must.be.string')),
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<OfferProductsOthersForm>({
    resolver: yupResolver(othersSchema),
    reValidateMode: 'onSubmit',
    mode: 'all',
    defaultValues: {
      county_coverage: [],
    },
  })

  const onFormSubmit = (values: DonateItemRequest) => {
    const donateItemRequest: DonateItemRequest = { ...values, category }
    onSubmit(donateItemRequest)
  }

  return (
    <ProductTypeWrapper onSubmit={handleSubmit(onFormSubmit)}>
      <RadioGroup
        label={t('services.offerTransport')}
        errors={errors['has_transportation']}
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
      <Product
        register={register}
        errors={errors}
        names={{
          name: 'name',
        }}
      />
      <Textarea
        {...register('description')}
        label={t('signup.products.description')}
        errors={errors['description']}
      />
      <Quantity
        register={register}
        errors={errors}
        names={{
          quantity: 'quantity',
          packaging_type: 'packaging_type',
          unit_type: 'unit_type',
        }}
      />
    </ProductTypeWrapper>
  )
}
