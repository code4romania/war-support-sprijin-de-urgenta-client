import { DonateOtherRequest } from 'api'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { MultiSelectOption } from '../../../components/Form/types'
import Input from '@/components/Form/Input'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import Button from '@/components/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import { SchemaOf } from 'yup'
import * as yup from 'yup'
import { OtherResourceForm } from '@/components/OtherResourcesForm/OtherResourcesForm'
import Dropdown from '@/components/Form/Dropdown'
import RadioGroup from '@/components/Form/RadioGroup'
import Radio from '@/components/Form/Radio'

interface IProps {
  counties: MultiSelectOption[]
  category: number
  onSubmit: (values: any) => void
}

export const RequestOthersForm: FC<IProps> = ({
  counties,
  category,
  onSubmit,
}) => {
  const { t } = useTranslation()

  const otherResourcesSchema: SchemaOf<OtherResourceForm> = yup.object().shape({
    name: yup.string().typeError(t('error.must.be.string')).required(t('error.must.be.string')),
    description: yup.string().typeError(t('error.must.be.string')),
    available_until: yup.string().typeError(t('error.must.be.string')),
    county_coverage: yup.string().required(t('error.county.required')),
    town: yup.string().typeError(t('error.must.be.string')),
  })
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(otherResourcesSchema),
  })

  const onFormSubmit = (values: any) => {
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
      <div className={'flex flex-col space-x-4'}>
        <Dropdown
          {...register('county_coverage')}
          className={clsx('w-1/2 mb-4')}
          errors={errors['county_coverage']}
          label={t('signup.other.county_coverage')}
        >
          {counties.length > 0 &&
            counties.map(({ value, label }) => (
              <option key={`${value}_${label}`} value={value}>
                {label}
              </option>
            ))}
        </Dropdown>
        <Input
          className={'w-1/2'}
          label={t('signup.other.town')}
          errors={errors['town']}
          {...register('town')}
        />
      </div>
      <Button type="submit" text={t('add')} variant="tertiary" size="small" />
    </form>
  )
}
