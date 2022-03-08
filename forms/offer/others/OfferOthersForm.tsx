import { DonateOtherRequest } from 'api'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { MultiSelectOption } from '../../../components/Form/types'
import Input from '@/components/Form/Input'
import Textarea from '@/components/Form/Textarea'
import clsx from 'clsx'
import DateInput from '@/components/Form/Date'
import DropdownMultiSelect from '@/components/Form/DropdownMultiSelect'
import { useTranslation } from 'react-i18next'
import Button from '@/components/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import { SchemaOf } from 'yup'
import * as yup from 'yup'
import RadioGroup from '@/components/Form/RadioGroup'
import Radio from '@/components/Form/Radio'

interface IProps {
  counties: MultiSelectOption[]
  category: number
  onSubmit: (values: any) => void
}

type Form = {
  name: string
  description?: string
  available_until?: string
  county_coverage: string[]
  town?: string
  has_transportation?: boolean
}

export const OfferOthersForm: FC<IProps> = ({
  counties,
  category,
  onSubmit,
}) => {
  const { t } = useTranslation()

  const otherResourcesSchema: SchemaOf<Form> = yup.object().shape({
    name: yup.string().typeError(t('error.must.be.string')).required(t('error.name.required')),
    description: yup.string().typeError(t('error.must.be.string')),
    available_until: yup.mixed().typeError(t('error.must.be.string')),
    county_coverage: yup
      .array()
      .min(1, t('error.county.minOne'))
      .of(yup.string().required()),
    town: yup.string().typeError(t('error.must.be.string')),
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
  } = useForm<Form>({
    resolver: yupResolver(otherResourcesSchema),
    reValidateMode: 'onSubmit',
    mode: 'all',
    defaultValues: {
      county_coverage: [],
      available_until: (new Date()).toISOString().split('T')[0]
    }
  })

  const onFormSubmit = (values: Form) => {
    const donateOtherRequest: DonateOtherRequest = { ...values, category }
    onSubmit(donateOtherRequest)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
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
        label={t('signup.other.name')}
        {...register('name')}
        errors={errors['name']}
      />
      <div className={'flex space-x-4'}>
        <DropdownMultiSelect
          {...register('county_coverage')}
          className={clsx('w-1/2 mb-4')}
          options={counties || []}
          errors={errors['county_coverage']}
          control={control}
          label={t('signup.other.county_coverage')}
        />
        <Input
          className={'w-1/2'}
          label={t('signup.other.town')}
          errors={errors['town']}
          {...register('town')}
        />
      </div>
      <Textarea
        label={t('signup.other.description')}
        className={clsx('w-full')}
        errors={errors['description']}
        {...register('description')}
      />
      <DateInput
        label={t('signup.other.available_until')}
        helpText={t('signup.other.available_until.help')}
        errors={errors['available_until']}
        {...register('available_until')}
      />
      <Button type="submit" text={t('add')} variant="tertiary" size="small" />
    </form>
  )
}
