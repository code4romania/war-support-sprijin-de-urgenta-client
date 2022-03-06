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
import { OtherResourceForm } from '@/components/OtherResourcesForm/OtherResourcesForm'

interface IProps {
  counties: MultiSelectOption[]
  category: number
  onSubmit: (values: any) => void
}

type Form = {
  name: string
  description?: string
  available_until?: Date
  county_coverage: string[]
  town: string
}

export const OfferOthersForm: FC<IProps> = ({
  counties,
  category,
  onSubmit,
}) => {
  const { t } = useTranslation()
  const otherResourcesSchema: SchemaOf<OtherResourceForm> = yup.object().shape({
    name: yup.string().typeError(t('error.must.be.string')).required(),
    category: yup.number().typeError(t('error.must.be.number')),
    description: yup.string().typeError(t('error.must.be.string')),
    available_until: yup.string().typeError(t('error.must.be.string')),
    county_coverage: yup
      .array()
      .min(1, t('error.county.minOne'))
      .of(yup.string().required()),
    town: yup.string().typeError(t('error.must.be.string')),
  })
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(otherResourcesSchema),
  })

  const onFormSubmit = (values: any) => {
    const donateOtherRequest: DonateOtherRequest = { ...values, category }
    onSubmit(donateOtherRequest)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
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
