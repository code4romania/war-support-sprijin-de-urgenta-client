import * as yup from 'yup'
import { FC } from 'react'
import { SchemaOf } from 'yup'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'

import Button from '@/components/Button'
import DateInput from '@/components/Form/Date'
import DropdownMultiSelect from '@/components/Form/DropdownMultiSelect'
import Input from '@/components/Form/Input'
import Textarea from '@/components/Form/Textarea'
import { DonateVolunteeringRequest } from 'api'
import { MultiSelectOption } from '@/components/Form/types'
import RadioGroup from '@/components/Form/RadioGroup'
import Radio from '@/components/Form/Radio'

interface IProps {
  counties: MultiSelectOption[]
  category: number
  onSubmit: (values: DonateVolunteeringRequest) => void
}

type OfferVolunteeringResourceForm = {
  name: string
  category: number
  town?: string
  description?: string
  available_until?: string
  county_coverage: string[]
  has_transportation?: boolean
}

export const OfferVolunteeringForm: FC<IProps> = ({
  counties,
  category,
  onSubmit,
}) => {
  const { t } = useTranslation()
  const volunteeringResourcesSchema: SchemaOf<OfferVolunteeringResourceForm> =
    yup.object().shape({
      name: yup.string().required(t('error.name.required')),
      category: yup
        .number()
        .typeError(t('error.must.be.number'))
        .required(t('validation.required')),
      town: yup.string().typeError(t('error.must.be.string')),
      description: yup.string().typeError(t('error.must.be.string')),
      available_until: yup.string().typeError(t('error.must.be.string')),
      county_coverage: yup
        .array()
        .min(1, t('error.county.minOne'))
        .of(yup.string().required()),
      has_transportation: yup
        .boolean()
        .typeError(t('error.must.be.boolean'))
        .required(t('error.has_transportation.required')),
    })

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<OfferVolunteeringResourceForm>({
    resolver: yupResolver(volunteeringResourcesSchema),
    reValidateMode: 'onSubmit',
    mode: 'all',
    defaultValues: {
      county_coverage: [],
      available_until: new Date().toISOString().split('T')[0],
      category,
    },
  })

  const onFormSubmit = (values: OfferVolunteeringResourceForm) => {
    const donateOtherRequest: DonateVolunteeringRequest = {
      ...values,
      type: category,
    }
    onSubmit(donateOtherRequest)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Input
        label={t('signup.volunteering.name')}
        {...register('name')}
        errors={errors.name}
      />
      <RadioGroup label={t('services.offerTransport')}>
        <div className="flex flex-row gap-6">
          <Radio value="true" {...register('has_transportation')}>
            {t('yes')}
          </Radio>
          <Radio value="false" {...register('has_transportation')}>
            {t('no')}
          </Radio>
        </div>
      </RadioGroup>
      <div className="flex gap-4">
        <DropdownMultiSelect
          {...register('county_coverage')}
          className="w-1/2 mb-4"
          options={counties || []}
          errors={errors['county_coverage']}
          control={control}
          label={t('signup.other.county_coverage')}
        />
        <Input label={t('signup.volunteering.town')} {...register('town')} />
      </div>
      <Textarea
        label={t('signup.volunteering.description')}
        {...register('description')}
      />
      <DateInput
        label={t('signup.volunteering.available_until')}
        {...register('available_until')}
      />
      <Button type="submit" text={t('add')} variant="tertiary" size="small" />
    </form>
  )
}
