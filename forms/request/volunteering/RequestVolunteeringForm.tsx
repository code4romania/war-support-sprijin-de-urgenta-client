import * as yup from 'yup'
import { DonateVolunteeringRequest } from 'api'
import { FC } from 'react'
import { SchemaOf } from 'yup'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'

import Button from '@/components/Button'
import Input from '@/components/Form/Input'
import { MultiSelectOption } from '@/components/Form/types'
import Dropdown from '@/components/Form/Dropdown'

interface IProps {
  counties: MultiSelectOption[]
  category: number
  onSubmit: (values: any) => void
}

type RequestVolunteeringResourceForm = {
  type?: string
  town?: string
  county_coverage: string
}

export const RequestVolunteeringForm: FC<IProps> = ({
  counties,
  category,
  onSubmit,
}) => {
  const { t } = useTranslation()
  const volunteeringResourcesSchema: SchemaOf<RequestVolunteeringResourceForm> =
    yup.object().shape({
      type: yup.string().typeError(t('error.must.be.string')),
      town: yup.string().typeError(t('error.must.be.string')),
      county_coverage: yup.string().typeError(t('error.must.be.string')).required(t('error.county.required')),
    })
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(volunteeringResourcesSchema),
  })

  const onFormSubmit = (values: any) => {
    const donateOtherRequest: DonateVolunteeringRequest = {
      ...values,
      category,
    }
    onSubmit(donateOtherRequest)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className={'flex space-x-2'}>
        <Dropdown
          required
          label={t('signup.other.county_coverage')}
          className={'w-full'}
          errors={errors['county_coverage']}
          {...register('county_coverage')}
        >
          {counties?.map(
            ({ label, value }: { label: string; value: string }) => {
              return (
                <option key={value} value={value}>
                  {label}
                </option>
              )
            }
          )}
        </Dropdown>
        <Input
          label={t('signup.volunteering.town')}
          {...register('town')}
          className={'w-full'}
        />
      </div>
      <Button type="submit" text={t('add')} variant="tertiary" size="small" />
    </form>
  )
}
