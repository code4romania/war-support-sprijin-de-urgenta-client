import { useMemo, useState } from 'react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import Textarea from '../Form/Textarea'
import { useData, useOthersForm } from '@/hooks/useData'
import { useForm } from 'react-hook-form'
import DateInput from '@/components/Form/Date'
import Dropdown from '@/components/Form/Dropdown'
import Input from '@/components/Form/Input'
import endpoints from 'endpoints.json'
import i18n from 'i18next'
import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import DropdownMultiSelect from '@/components/Form/DropdownMultiSelect'

type OtherResourceForm = {
  name?: string
  category?: string
  description?: string
  available_until?: string
  county_coverage: string[]
  town?: string
}

const OtherResourcesForm = ({}) => {
  const { t } = useTranslation()
  const { data: formData } = useOthersForm()
  const [serverErrors, setServerErrors] = useState<{ [key: string]: string[] }>(
    {}
  )
  const { data: categories } = useData(endpoints['categories/other'])

  const countyCovarage = useMemo(() => {
    return formData?.county_coverage?.choices.map((c: any) => ({ value: c.value, label: c.display_name }))
  }, [formData?.county_coverage?.choices])

  const today = new Date().toISOString().substr(0, 10)
  const otherResourcesSchema: SchemaOf<OtherResourceForm> = yup.object().shape({
    name: yup.string().typeError(t('error.must.be.string')),
    category: yup.string().typeError(t('error.must.be.string')),
    description: yup.string().typeError(t('error.must.be.string')),
    available_until: yup.string().typeError(t('error.must.be.string')),
    county_coverage: yup.array().min(1, t('error.county.minOne')).of(yup.string().required()),
    town: yup.string().typeError(t('error.must.be.string')),
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(otherResourcesSchema),
  })

  const onSubmit = async (values: any) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PUBLIC_API}/${i18n.language}${endpoints['donate/other']}`,
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

      if (res.ok) {
        setServerErrors({})
        const [data] = await res.json()
        console.log('data', data)
      } else {
        const [data] = await res.json()
        setServerErrors(data)
      }
    } catch (e) {
      console.log('e', e)
    }
  }

  return (
    <section
      className={clsx(
        'container grid place-items-start gap-6',
        'bg-blue-50 rounded',
        'mx-auto px-8 py-7'
      )}
    >
      <h3 className="text-lg font-semibold">{`${t(
        'signup.other.header'
      )}:`}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Dropdown label={t('signup.other.category')} {...register('category')}>
          {categories?.map(({ id, name }: { id: number; name: string }) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </Dropdown>

        <Input
          label={t('signup.other.name')}
          {...register('name')}
          errors={
            serverErrors['name']
              ? { message: serverErrors['name'].join('\n') }
              : errors['name']
          }
        />
        <Textarea
          label={t('signup.other.description')}
          className={clsx('w-full')}
          errors={
            serverErrors['description']
              ? { message: serverErrors['description'].join('\n') }
              : errors['description']
          }
          {...register('description')}
        />
        <DateInput
          label={t('signup.other.available_until')}
          helpText={t('signup.other.available_until.help')}
          errors={
            serverErrors['available_until']
              ? { message: serverErrors['available_until'].join('\n') }
              : errors['available_until']
          }
          {...register('available_until')}
        />
        <div className={'flex space-x-4'}>
          <DropdownMultiSelect
            {...register('county_coverage')}
            className={clsx('w-1/2 mb-4')}
            options={countyCovarage || []}
            errors={
              serverErrors['county_coverage']
                ? { message: serverErrors['county_coverage'].join('\n') }
                : errors['county_coverage']
            }
            control={control}
            label={t('signup.other.county_coverage')}
          />
          <Input
            className={'w-1/2'}
            label={t('signup.other.town')}
            errors={
              serverErrors['town']
                ? { message: serverErrors['town'].join('\n') }
                : errors['town']
            }
            {...register('town')}
          />
        </div>
        {/*TODO: remove*/}
        <button type={'submit'}>Send</button>
      </form>
    </section>
  )
}

export default OtherResourcesForm
