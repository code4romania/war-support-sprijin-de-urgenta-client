import Input from '@/components/Form/Input'
import Textarea from '@/components/Form/Textarea'
import Location from 'forms/common/Location'
import ProductTypeWrapper from 'forms/common/ProductTypeWrapper'
import Quantity from 'forms/common/Quantity'
import { ResourceType } from 'forms/types'
import { DonateItemRequestWithoutName } from 'api'
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
  textile_category: number
  county_coverage: string[]
  town?: string
  quantity?: number
  unit_type: string
  packaging_type: string
  has_transportation?: boolean
  textile_size?: string
  name?: string
  other_textiles?: string
}


enum TextileCategory {
  ClothingFemale = 1,
  ClothingMale = 2,
  ClothingChildren = 3,

  Blankets = 4,
  Sheets = 5,
  SleepingBags = 6,
  Other = 7
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
    textile_category: yup
      .number()
      .typeError(t('error.textile.category.required'))
      .required(t('error.textile.category.required')),
    textile_size: yup.string().notRequired(),
    name: yup.string().required(t('validation.required')),
    other_textiles: yup.string().notRequired()
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    watch
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
      category: category,
      kind: 'noName'
    }

    const itemCategory = donateItemRequest.textile_category

    // clean size if textile category is other
    if (itemCategory === TextileCategory.Blankets
      || itemCategory === TextileCategory.Sheets
      || itemCategory === TextileCategory.SleepingBags
      || itemCategory === TextileCategory.Other) {
      donateItemRequest.textile_size = '';
    }

    // clean other if textile category is clothing
    if (itemCategory === TextileCategory.ClothingChildren
      || itemCategory === TextileCategory.ClothingFemale
      || itemCategory === TextileCategory.ClothingMale) {
      donateItemRequest.other_textiles = '';
    }

    onSubmit(donateItemRequest)
  }

  const textileCategory = watch("textile_category")?.toString()

  const enableOtherTextileTextarea = textileCategory === TextileCategory.Other.toString()
  const enableClothingSizeInput = textileCategory === TextileCategory.ClothingChildren.toString()
    || textileCategory === TextileCategory.ClothingFemale.toString()
    || textileCategory === TextileCategory.ClothingMale.toString();

  return (
    <ProductTypeWrapper onSubmit={handleSubmit(onFormSubmit)}>
      <RadioGroup
        required
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

      <Input
          label={t('signup.products.name')}
          labelPosition="horizontal"
          errors={errors.name}
          {...register('name')}
        />

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
