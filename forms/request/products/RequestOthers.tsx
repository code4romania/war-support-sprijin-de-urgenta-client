import Textarea from '@/components/Form/Textarea'
import Product from 'forms/common/Product'
import ProductTypeWrapper from 'forms/common/ProductTypeWrapper'
import { RequestItemRequest } from 'api'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import RadioGroup from '@/components/Form/RadioGroup'
import Radio from '@/components/Form/Radio'
import Quantity from "../../common/Quantity";
import RequestLocation from "./RequestLocation";
import { MultiSelectOption } from "@/components/Form/types";
import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

interface IProps {
  category: number
  counties?: MultiSelectOption[]
  onSubmit: (values: RequestItemRequest) => void
}

type RequestOthersForm = {
  county_coverage: string
  town?: string
  name: string
  description?: string
  quantity?: number
  unit_type: string
  packaging_type: string
  has_transportation?: boolean
}

export const RequestOthers: FC<IProps> = ({ onSubmit, category, counties }) => {
  const { t } = useTranslation()
  const otherRequestSchema: SchemaOf<RequestOthersForm> = yup.object().shape({
    county_coverage: yup
      .string()
      .typeError(t('error.must.be.string'))
      .required(t('error.county.required')),
    town: yup.string().notRequired(),
    name: yup
      .string()
      .typeError(t('error.must.be.string'))
      .required(t('error.county.required')),
    description: yup.string().notRequired(),
    quantity: yup
      .number()
      .min(1, t('error.quantity.minOne'))
      .typeError(t('error.must.be.number')),
    unit_type: yup.string().required(t('error.unitType.required')),
    packaging_type: yup.string().required(t('error.packagkingType.required')),
    has_transportation: yup
      .boolean()
      .typeError(t('error.must.be.boolean'))
      .required(t('error.has_transportation.required'))
  })
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<RequestOthersForm>({
    resolver: yupResolver(otherRequestSchema),
    reValidateMode: 'onSubmit',
    mode: 'all',
  })

  const onFormSubmit = (values: RequestOthersForm) => {
    const donateItemRequest: RequestItemRequest = { ...values, category, kind: 'withName' }
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
