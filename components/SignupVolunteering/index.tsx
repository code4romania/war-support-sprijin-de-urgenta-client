import { FC, useMemo } from 'react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import Input from '@/components/Form/Input'
import Textarea from '@/components/Form/Textarea'
import { useData, useVolunteeringForm } from '@/hooks/useData'
import DateInput from '@/components/Form/Date'
import Dropdown from '@/components/Form/Dropdown'
import { useForm } from 'react-hook-form'
import endpoints from 'endpoints.json'
import i18n from 'i18next'
import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import DropdownMultiSelect from '@/components/Form/DropdownMultiSelect'

type VolunteeringResourceForm = {
  type?: string
  town?: string
  description?: string
  available_until?: string
  county_coverage?: string
}

const SignupVolunteering: FC = () => {
  const { t } = useTranslation()
  const { data: formData } = useVolunteeringForm()
  const { data: categories } = useData(endpoints['categories/volunteering'])
  const countyCovarage = useMemo(() => {
    return formData?.county_coverage?.choices.map((c: any) => ({
      value: c.value,
      label: c.display_name,
    }))
  }, [formData?.county_coverage?.choices])
  const today = new Date().toISOString().substr(0, 10)
  const volunteeringResourcesSchema: SchemaOf<VolunteeringResourceForm> = yup
    .object()
    .shape({
      type: yup.string().typeError(t('error.must.be.string')),
      town: yup.string().typeError(t('error.must.be.string')),
      description: yup.string().typeError(t('error.must.be.string')),
      available_until: yup.string().typeError(t('error.must.be.string')),
      county_coverage: yup
        .array()
        .min(1, t('error.county.minOne'))
        .of(yup.string().required()),
    })
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(volunteeringResourcesSchema),
  })

  const onSubmit = async (values: any) => {
    fetch(
      `${process.env.NEXT_PUBLIC_PUBLIC_API}/${i18n.language}${endpoints['donate/volunteering']}`,
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify([values]),
      }
    )
  }

  return (
    <div
      className={clsx(
        'container grid place-items-start gap-6',
        'bg-blue-50 rounded',
        'mx-auto px-8 py-7'
      )}
    >
      <h3 className="text-lg font-semibold">
        {t('signup.volunteering.header')}
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Dropdown label={t('signup.volunteering.type')} {...register('type')}>
          {categories?.map(({ id, name }: { id: string; name: string }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </Dropdown>
        <Textarea
          label={t('signup.volunteering.description')}
          {...register('description')}
        />
        <div className={'flex space-x-4'}>
          <DropdownMultiSelect
            {...register('county_coverage')}
            className={clsx('w-1/2 mb-4')}
            options={countyCovarage || []}
            errors={errors['county_coverage']}
            control={control}
            label={t('signup.other.county_coverage')}
          />
          <Input label={t('signup.volunteering.town')} {...register('town')} />
        </div>
        <DateInput
          label={t('signup.volunteering.available_until')}
          {...register('available_until')}
        />
        {/*TODO: remove*/}
        <button type={'submit'}>Send</button>
      </form>
    </div>
  )
}

export default SignupVolunteering
