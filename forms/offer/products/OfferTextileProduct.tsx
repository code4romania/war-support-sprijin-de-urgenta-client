import Checkbox from '@/components/Form/Checkbox'
import Input from '@/components/Form/Input'
import Textarea from '@/components/Form/Textarea'
import Location from 'forms/common/Location'
import ProductTypeWrapper from 'forms/common/ProductTypeWrapper'
import Quantity from 'forms/common/Quantity'
import { ResourceType } from 'forms/types'
import { DonateItemRequest, DonateItemRequestWithoutName } from 'api'
import clsx from 'clsx'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { MultiSelectOption } from '../../../components/Form/types'
import RadioGroup from '@/components/Form/RadioGroup'
import Radio from '@/components/Form/Radio'
import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

interface IProps {
  resourceType: ResourceType
  counties?: MultiSelectOption[]
  onSubmit: (values: DonateItemRequestWithoutName) => void
  category: number
}

type OfferTextileProductForm = {
  county_coverage: string[]
  town?: string
  quantity?: number
  unit_type: string
  packaging_type: string
  has_transportation?: boolean
}

export const OfferTextileProduct: FC<IProps> = ({
  resourceType,
  counties,
  onSubmit,
  category
}) => {
  const { t } = useTranslation()

  const textilesSchema: SchemaOf<OfferTextileProductForm> = yup.object().shape({
    county_coverage: yup
      .array()
      .min(1, t('error.county.minOne'))
      .of(yup.string().required()),
    town: yup.string(),
    quantity: yup.number().min(1, t('error.quantity.minOne')).typeError(t('error.must.be.number')),
    unit_type: yup.string().required(t('error.unitType.required')),
    packaging_type: yup.string().required(t('error.packagkingType.required')),
    has_transportation: yup
      .boolean()
      .typeError(t('error.must.be.boolean'))
      .required(t('error.has_transportation.required')),
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<OfferTextileProductForm>({
    resolver: yupResolver(textilesSchema),
    reValidateMode: 'onSubmit',
    mode: 'all',
    defaultValues: {
      county_coverage: [],
    },
  })

  const onFormSubmit = (values: OfferTextileProductForm) => {
    const donateItemRequest: DonateItemRequestWithoutName = {
      ...values,
      category,
      kind: 'noName'
    }
    onSubmit(donateItemRequest)
  }

  return (
    <ProductTypeWrapper onSubmit={handleSubmit(onFormSubmit)}>
      <RadioGroup
        label={t('services.offerTransport')}
        errors={errors.has_transportation}
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
      <Checkbox name={`products_${resourceType}_clothing`}>
        {t('signup.products.clothing')}
      </Checkbox>
      <div className={clsx('ml-5 grid grid-cols-2')}>
        <Checkbox name={`products_${resourceType}_female`}>
          {t('signup.products.female')}
        </Checkbox>
        <Checkbox name={`products_${resourceType}_male`}>
          {t('signup.products.male')}
        </Checkbox>
        <Checkbox name={`products_${resourceType}_children`}>
          {t('signup.products.children')}
        </Checkbox>
        <Input
          name={`products_${resourceType}_children_age`}
          label={t('signup.products.children.age')}
          labelPosition="horizontal"
        />
      </div>

      <Checkbox name={`products_${resourceType}_blankets`}>
        {t('signup.products.blankets')}
      </Checkbox>

      <Checkbox name={`products_${resourceType}_sheets`}>
        {t('signup.products.sheets')}
      </Checkbox>

      <Checkbox name={`products_${resourceType}_sleepingBags`}>
        {t('signup.products.sleepingBags')}
      </Checkbox>

      <div>
        <Checkbox name={`products_${resourceType}_others`}>
          {t('signup.products.others')}
        </Checkbox>
        <div className="ml-5">
          <Textarea name={`products_${resourceType}_others_content`} />
        </div>
      </div>

      <Quantity
        register={register}
        errors={errors}
        names={{
          quantity: 'quantity',
          packaging_type: 'packaging_type',
          unit_type: 'unit_type',
        }}
      />

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
    </ProductTypeWrapper>
  )
}
