import Input from '@/components/Form/Input'
import Location from 'forms/common/Location'
import ProductTypeWrapper from 'forms/common/ProductTypeWrapper'
import { DonateItemRequest } from 'api'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { MultiSelectOption } from '../../../components/Form/types'
import RadioGroup from '@/components/Form/RadioGroup'
import Radio from '@/components/Form/Radio'
import clsx from 'clsx'

interface IProps {
  counties?: MultiSelectOption[]
  category: number
  onSubmit: (values: DonateItemRequest) => void
}
type RequestTentsForm = {
  county_coverage: string[]
  town: string
  name: string
  quantity: number
  tent_capacity: number
  unit_type: string
  has_transportation: boolean
}

export const RequestTents: FC<IProps> = ({ counties, category, onSubmit }) => {
  const { t } = useTranslation()
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<RequestTentsForm>()

  const onFormSubmit = (values: DonateItemRequest) => {
    const donateItemRequest: DonateItemRequest = {
      ...values,
      unit_type: 'tent',
    }
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
      <Location
        counties={counties}
        control={control}
        errors={errors}
        register={register}
        names={{
          county_coverage: 'county_coverage',
          town: 'town',
        }}
      />
    </ProductTypeWrapper>
  )
}
