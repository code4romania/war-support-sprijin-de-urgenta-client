import Checkbox from '@/components/Form/Checkbox'
import Input from '@/components/Form/Input'
import Textarea from '@/components/Form/Textarea'

import ProductTypeWrapper from 'forms/common/ProductTypeWrapper'
import Quantity from 'forms/common/Quantity'
import { ResourceType, TextileCategory } from 'forms/types'
import { RequestItemRequestWithoutName } from 'api'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { MultiSelectOption } from '../../../components/Form/types'
import RadioGroup from '@/components/Form/RadioGroup'
import Radio from '@/components/Form/Radio'
import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Dropdown from '@/components/Form/Dropdown'
import RequestLocation from './RequestLocation'


interface IProps {
  resourceType: ResourceType
  category: number
  counties: MultiSelectOption[]
  onSubmit: (values: RequestItemRequestWithoutName) => void
}

type RequestTextileProductForm = {
  county_coverage: string
  town?: string
  quantity?: number
  unit_type: string
  packaging_type: string
  textile_category: number
  textile_size?: string
  other_textiles?: string
}

export const RequestTextileProduct: FC<IProps> = ({
  counties,
  category,
  onSubmit,
}) => {
  const { t } = useTranslation()

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    watch
  } = useForm<RequestTextileProductForm>(

  )

  const onFormSubmit = (values: RequestTextileProductForm) => {
    const requestItemRequest: RequestItemRequestWithoutName = { ...values, category, kind: 'noName', name: 'textile' }
    const itemCategory = requestItemRequest.textile_category

    // clean size if textile category is other
    if (itemCategory === TextileCategory.Blankets
      || itemCategory === TextileCategory.Sheets
      || itemCategory === TextileCategory.SleepingBags
      || itemCategory === TextileCategory.Other) {
      requestItemRequest.textile_size = '';
    }

    // clean other if textile category is clothing
    if (itemCategory === TextileCategory.ClothingChildren
      || itemCategory === TextileCategory.ClothingFemale
      || itemCategory === TextileCategory.ClothingMale) {
      requestItemRequest.other_textiles = '';
    }

    onSubmit(requestItemRequest)
  }

  const textileCategory = watch("textile_category")?.toString()

  const enableOtherTextileTextarea = textileCategory === TextileCategory.Other.toString()
  const enableClothingSizeInput = textileCategory === TextileCategory.ClothingChildren.toString()
    || textileCategory === TextileCategory.ClothingFemale.toString()
    || textileCategory === TextileCategory.ClothingMale.toString();

  return (
    <ProductTypeWrapper onSubmit={handleSubmit(onFormSubmit)}>
      <RadioGroup
        label={t('signup.products.clothing')}
        errors={errors.textile_category}
      >
        <Radio value={TextileCategory.ClothingFemale} {...register('textile_category')}>
          {t('signup.products.female')}
        </Radio>
        <Radio value={TextileCategory.ClothingMale} {...register('textile_category')}>
          {t('signup.products.male')}
        </Radio>
        <Radio value={TextileCategory.ClothingChildren} {...register('textile_category')}>
          {t('signup.products.children')}
        </Radio>
        <Input
          label={t('signup.products.size')}
          labelPosition="horizontal"
          errors={errors.textile_size}
          {...register('textile_size')}
          disabled={!(enableClothingSizeInput)}
        />

        <h3 className="block mb-4 text-base font-semibold text-gray-700">
          {t('signup.products.textiles')}
        </h3>

        <Radio value={TextileCategory.Blankets} {...register('textile_category')}>
          {t('signup.products.blankets')}
        </Radio>
        <Radio value={TextileCategory.Sheets} {...register('textile_category')}>
          {t('signup.products.sheets')}
        </Radio>
        <Radio value={TextileCategory.SleepingBags} {...register('textile_category')}>
          {t('signup.products.sleepingBags')}
        </Radio>
        <div>
          <Radio value={TextileCategory.Other} {...register('textile_category')}>
            {t('signup.products.others')}
          </Radio>

          <div className="ml-5">
            <Textarea {...register('other_textiles')} disabled={!(enableOtherTextileTextarea)}/>
          </div>
        </div>
      </RadioGroup>

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
