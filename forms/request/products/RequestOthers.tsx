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

interface IProps {
  category: number
  counties?: MultiSelectOption[]
  onSubmit: (values: RequestItemRequest) => void
}

type RequestOthersForm = {
  county_coverage: string
  town: string
  name: string
  description: string
  quantity: number
  unit_type: string
  packaging_type: string
}

export const RequestOthers: FC<IProps> = ({ onSubmit, category, counties }) => {
  const { t } = useTranslation()
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<RequestOthersForm>()

  const onFormSubmit = (values: RequestOthersForm) => {
    const donateItemRequest: RequestItemRequest = { ...values, category, kind: 'withName' }
    onSubmit(donateItemRequest)
  }

  return (
    <ProductTypeWrapper onSubmit={handleSubmit(onFormSubmit)}>
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
