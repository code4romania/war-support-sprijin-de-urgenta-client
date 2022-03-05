import { Label } from '@/components/Form/common'
import Input from '@/components/Form/Input'
import Location from '@/components/SignUpProducts/common/Location'
import ProductTypeWrapper from '@/components/SignUpProducts/common/ProductTypeWrapper'
import { DonateItemRequest } from 'api'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { MultiSelectOption } from '../Form/types'

interface IProps {
  counties?: MultiSelectOption[]
  category: number
  onSubmit: (values: DonateItemRequest) => void
}
type TentsForm = {
  county_coverage: string[]
  town: string
  name: string
  quantity: number
  tent_capacity: number
  unit_type: string
}

const Tents: FC<IProps> = ({ counties, category, onSubmit }) => {
  const { t } = useTranslation()
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<TentsForm>()

  const onFormSubmit = (values: DonateItemRequest) => {
    const donateItemRequest: DonateItemRequest = {
      ...values,
      unit_type: 'tent',
    }
    onSubmit(donateItemRequest)
  }

  return (
    <ProductTypeWrapper onSubmit={handleSubmit(onFormSubmit)}>
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

export default Tents
