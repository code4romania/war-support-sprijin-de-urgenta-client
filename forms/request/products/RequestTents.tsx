import { Label } from '@/components/Form/common'
import Input from '@/components/Form/Input'
import Radio from '@/components/Form/Radio'
import RadioGroup from '@/components/Form/RadioGroup'
import { DonateItemRequestWithoutName } from 'api'
import clsx from 'clsx'
import Location from 'forms/common/Location'
import ProductTypeWrapper from 'forms/common/ProductTypeWrapper'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { MultiSelectOption } from '../../../components/Form/types'

interface IProps {
  counties?: MultiSelectOption[]
  category: number
  onSubmit: (values: DonateItemRequestWithoutName) => void
}
type RequestTentsForm = {
  county_coverage: string[]
  town: string
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

  const onFormSubmit = (values: RequestTentsForm) => {
    const donateItemRequest: DonateItemRequestWithoutName = {
      ...values,
      unit_type: 'tent',
      kind: 'noName'
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
      <div className="flex gap-4">
        <Input
          type="number"
          label={t('signup.products.capacity')}
          {...register('tent_capacity')}
          labelPosition="horizontal"
        />
        <Label
          name={t('signup.products.persons')}
          className={'translate-y-[10px] flex-[1_0_25%]'}
        >
          {t('signup.products.persons')}
        </Label>
      </div>
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
