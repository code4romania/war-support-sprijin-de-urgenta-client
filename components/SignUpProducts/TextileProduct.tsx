import Checkbox from '@/components/Form/Checkbox'
import Input from '@/components/Form/Input'
import Textarea from '@/components/Form/Textarea'
import Location from '@/components/SignUpProducts/common/Location'
import ProductTypeWrapper from '@/components/SignUpProducts/common/ProductTypeWrapper'
import Quantity from '@/components/SignUpProducts/common/Quantity'
import { ResourceType } from '@/components/SignUpProducts/types'
import { DonateItemRequest } from 'api'
import clsx from 'clsx'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { MultiSelectOption } from '../Form/types'
import RadioGroup from '@/components/Form/RadioGroup'
import Radio from '@/components/Form/Radio'
interface IProps {
  resourceType: ResourceType
  counties?: MultiSelectOption[]
  onSubmit: (values: DonateItemRequest) => void
}

type TextileProductForm = {
  county_coverage: string[]
  town: string;
  name: string;
  quantity: number;
  unit_type: string;
  packaging_type: string;
  has_transportation: boolean;
}

const TextileProduct: FC<IProps> = ({ resourceType, counties, onSubmit }) => {
  const { t } = useTranslation()
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<TextileProductForm>()

  const onFormSubmit = (values: DonateItemRequest) => {
    const donateItemRequest: DonateItemRequest = { ...values };
    onSubmit(donateItemRequest)
  }

  return (
    <ProductTypeWrapper onSubmit={handleSubmit(onFormSubmit)}>
      <RadioGroup
        label={t('services.offerTransport')}
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
          unit_type: 'unit_type'
        }}
      />

      <Location
        counties={counties}
        control={control}
        register={register}
        errors={errors}
        names={{
          county_coverage: 'county_coverage',
          town: 'town'
        }}
      />
    </ProductTypeWrapper>
  )
}

export default TextileProduct
