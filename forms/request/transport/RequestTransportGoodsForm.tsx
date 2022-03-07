import Button from '@/components/Button'
import Dropdown from '@/components/Form/Dropdown'
import Input from '@/components/Form/Input'
import Radio from '@/components/Form/Radio'
import Textarea from '@/components/Form/Textarea'
import RadioGroup from '@/components/Form/RadioGroup'
import { useServicesForm } from '@/hooks/useData'
import { yupResolver } from '@hookform/resolvers/yup'
import { RequestTransportServicesRequest, TransportCategories } from 'api'
import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { FormPageProps } from '@/components/FormPage/FormPage'

type ServicesForm = {
  category?: string
  from_county: string
  from_city: string
  to_county: string
  to_city: string
  description?: string
  has_refrigeration?: boolean
  weight_capacity?: number
  weight_unit?: string
}

interface IRequestTransportGoodsFormProps {
  onSubmit: (data: RequestTransportServicesRequest) => void
}

export const RequestTransportGoodsForm = ({
  onSubmit,
}: IRequestTransportGoodsFormProps) => {
  const { t } = useTranslation()
  const { data } = useServicesForm(FormPageProps.Request)

  const transportGoodsSchema: SchemaOf<ServicesForm> = yup.object().shape({
    category: yup.string().typeError(t('error.must.be.string')),
    from_county: yup
      .string()
      .required('error.county.required')
      .typeError(t('error.must.be.string')),
    from_city: yup
      .string()
      .required('error.town.required')
      .typeError(t('error.must.be.string')),
    to_county: yup
      .string()
      .required('error.county.required')
      .typeError(t('error.must.be.string')),
    to_city: yup
      .string()
      .required('error.town.required')
      .typeError(t('error.must.be.string')),
    description: yup.string().typeError(t('error.must.be.string')),
    has_refrigeration: yup
      .boolean()
      .typeError(t('error.must.be.boolean'))
      .required(t('error.has_refrigeration.required')),
    weight_unit: yup.string().typeError(t('error.must.be.string')),
    weight_capacity: yup.number().typeError(t('error.must.be.number')),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServicesForm>({
    defaultValues: {
      weight_capacity: 0,
    },
    resolver: yupResolver(transportGoodsSchema),
    reValidateMode: 'onSubmit',
    mode: 'all',
  })

  const countiesFromOptions = useMemo(() => {
    return (
      data?.from_county?.choices.map((c: any) => ({
        value: c.value,
        label: c.display_name,
      })) || []
    )
  }, [data?.from_county?.choices])

  const countiesToOptions = useMemo(() => {
    return (
      data?.to_county?.choices.map((c: any) => ({
        value: c.value,
        label: c.display_name,
      })) || []
    )
  }, [data?.to_county?.choices])

  const onAdd = async (data: ServicesForm) => {
    const goodsTransportRequest: RequestTransportServicesRequest = {
      weight_capacity: data.weight_capacity,
      weight_unit: data.weight_unit,
      has_refrigeration: !!data.has_refrigeration,
      from_county: data.from_county,
      from_city: data.from_city,
      to_county: data.to_county,
      to_city: data.to_city,
      description: data.description,
      category: TransportCategories.Goods,
    }

    onSubmit(goodsTransportRequest)
  }

  return (
    <div>
      <form aria-label="form" className="w-full" onSubmit={handleSubmit(onAdd)}>
        <section className="w-full">
          <Textarea
            label={t('services.description')}
            {...register('description')}
          />
          <div className={clsx('flex flex-row items-center space-x-2')}>
            <Input
              type="number"
              label={t('services.capacity')}
              errors={errors['weight_capacity']}
              step="any"
              {...register('weight_capacity')}
            />
            <Input
              label={t('services.weight_unit')}
              errors={errors['weight_unit']}
              {...register('weight_unit')}
            />
          </div>
          <RadioGroup
            errors={errors['has_refrigeration']}
            label={t('services.cooling')}
          >
            <div className={clsx('flex flex-row gap-6')}>
              <Radio value="true" {...register('has_refrigeration')}>
                {t('yes')}
              </Radio>
              <Radio value="false" {...register('has_refrigeration')}>
                {t('no')}
              </Radio>
            </div>
          </RadioGroup>
          <Dropdown
            {...register('from_county')}
            className={clsx('w-1/2 mb-4')}
            label={t('services.from_county')}
          >
            {countiesFromOptions.length > 0 &&
              countiesFromOptions.map(
                ({ value, label }: { value: string; label: string }) => (
                  <option key={`${value}_${label}`} value={value}>
                    {label}
                  </option>
                )
              )}
          </Dropdown>
          <Input
            {...register('from_city')}
            className={'w-1/2'}
            label={t('signup.other.town')}
          />
          <Dropdown
            {...register('to_county')}
            className={clsx('w-1/2 mb-4')}
            label={t('services.to_county')}
          >
            {countiesToOptions.length > 0 &&
              countiesToOptions.map(
                ({ value, label }: { value: string; label: string }) => (
                  <option key={`${value}_${label}`} value={value}>
                    {label}
                  </option>
                )
              )}
          </Dropdown>
          <Input
            {...register('to_city')}
            className={'w-1/2'}
            label={t('signup.other.town')}
          />
        </section>
        <Button type="submit" text={t('add')} variant="tertiary" size="small" />
      </form>
    </div>
  )
}
