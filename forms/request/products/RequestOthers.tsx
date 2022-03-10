import Textarea from '@/components/Form/Textarea'
import Product from 'forms/common/Product'
import ProductTypeWrapper from 'forms/common/ProductTypeWrapper'
import { RequestItemRequest } from 'api'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import RadioGroup from '@/components/Form/RadioGroup'
import Radio from '@/components/Form/Radio'

interface IProps {
  category: number
  onSubmit: (values: RequestItemRequest) => void
}

type RequestOthersForm = {
  county_coverage: string
  unit_type: string
  name: string
  description: string
  has_transportation: boolean
}

export const RequestOthers: FC<IProps> = ({ onSubmit, category }) => {
  const { t } = useTranslation()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RequestOthersForm>()

  const onFormSubmit = (values: RequestOthersForm) => {
    const donateItemRequest: RequestItemRequest = { ...values, category, kind: 'withName' }
    onSubmit(donateItemRequest)
  }

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
    </ProductTypeWrapper>
  )
}
