import clsx from 'clsx'
import Location from 'forms/common/Location'
import Product from 'forms/common/Product'
import ProductTypeWrapper from 'forms/common/ProductTypeWrapper'
import Quantity from 'forms/common/Quantity'
import Radio from '@/components/Form/Radio'
import RadioGroup from '@/components/Form/RadioGroup'
import { DonateItemRequest } from 'api'
import { FC } from 'react'
import { MultiSelectOption } from '../../../components/Form/types'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { dateInTheFutureValidator, dateStringValidator } from 'forms/validators'

interface IProps {
  counties: MultiSelectOption[]
  onSubmit: (values: DonateItemRequest) => void
  category: number
}

type OfferBuildingMaterialsForm = {
  county_coverage: string[]
  has_transportation: boolean
  town?: string
  name: string
  quantity?: number
  unit_type: string
  packaging_type: string
  expiration_date?: string
}

export const OfferBuildingMaterials: FC<IProps> = ({ counties, onSubmit, category }) => {
  const { t } = useTranslation()
  
  const buildingMaterialsSchema: SchemaOf<OfferBuildingMaterialsForm> = yup
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
      expiration_date: yup
        .string()
        .required(t('validation.required'))
        .test(dateStringValidator.name, t('validation.date.invalid'), dateStringValidator.test)
        .test(dateInTheFutureValidator.name, t('validation.date.must.be.in.future'), dateInTheFutureValidator.test)
    })

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<OfferBuildingMaterialsForm>({
    resolver: yupResolver(buildingMaterialsSchema),
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
      <Location
        counties={counties}
        register={register}
        control={control}
        errors={errors}
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
