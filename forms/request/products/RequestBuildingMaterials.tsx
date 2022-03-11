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
import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
interface IProps {
  counties: MultiSelectOption[]
  category: number
  onSubmit: (values: RequestItemRequest) => void
}

type RequestBuildingMaterialsForm = {
  county_coverage: string
  town?: string
  name?: string
  quantity?: number
  unit_type: string
  packaging_type: string
  has_transportation: boolean
}

export const RequestBuildingMaterials: FC<IProps> = ({
  counties,
  category,
  onSubmit,
}) => {
  const { t } = useTranslation()

  const buildingMaterialsRequestSchema: SchemaOf<RequestBuildingMaterialsForm> = yup.object().shape({
    county_coverage: yup
      .string()
      .typeError(t('error.must.be.string'))
      .required(t('error.county.required')),
    town: yup.string().notRequired(),
    has_transportation: yup
      .boolean()
      .typeError(t('error.must.be.boolean'))
      .required(t('error.has_transportation.required')),
    quantity: yup.number().min(1, t('error.quantity.minOne')).typeError(t('error.must.be.number')),
    unit_type: yup
      .string()
      .typeError(t('error.must.be.string'))
      .required(t('error.county.required')),
    packaging_type: yup
      .string()
      .typeError(t('error.must.be.string'))
      .required(t('error.county.required')),
    name: yup
      .string()
      .typeError(t('error.must.be.string'))
      .required(t('error.county.required')),
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<RequestBuildingMaterialsForm>(
    {
      resolver: yupResolver(buildingMaterialsRequestSchema),
      reValidateMode: 'onSubmit',
      mode: 'all',
      defaultValues: { },
    }
  )

  const onFormSubmit = (values: RequestBuildingMaterialsForm) => {
    const donateItemRequest: RequestItemRequest = { ...values, kind: 'withName', category }
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
