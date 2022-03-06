import { Label } from '@/components/Form/common'
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
import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
interface IProps {
  counties?: MultiSelectOption[]
  category: number
  onSubmit: (values: DonateItemRequest) => void
}
type OfferTentsForm = {
  county_coverage: string[]
  has_transportation: boolean
  town?: string
  name: string
  quantity?: number
  tent_capacity: number
  unit_type: string
}

export const OfferTents: FC<IProps> = ({ counties, category, onSubmit }) => {
  const { t } = useTranslation()

  const tentsSchema: SchemaOf<OfferTentsForm> = yup.object().shape({
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
    quantity: yup.number().typeError(t('error.must.be.number')),
    tent_capacity: yup.number().required(t('error.tentCapacity.required')),
    unit_type: yup.string().required(t('error.unitType.required')),
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<OfferTentsForm>({
    resolver: yupResolver(tentsSchema),
    reValidateMode: 'onSubmit',
    mode: 'all',
    defaultValues: {
      county_coverage: [],
    },
  })

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
