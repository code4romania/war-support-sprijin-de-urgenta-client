import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import Textarea from '../Form/Textarea'
import { useOthersForm } from '@/hooks/useData'
import { useForm } from 'react-hook-form'
import DateInput from '@/components/Form/Date'
import Dropdown from '@/components/Form/Dropdown'
import Input from '@/components/Form/Input'
import endpoints from '../../endpoints.json'
import { useState } from 'react'

const OtherResourcesForm = ({}) => {
  const { t } = useTranslation()
  const { data: formData } = useOthersForm()
  const [serverErrors, setServerErrors] = useState<{ [key: string]: string[] }>(
    {}
  )
  const countyCovarage = formData ? formData['county_coverage'].choices : []
  const today = new Date().toISOString().substr(0, 10)
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const onSubmit = async (values: any) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PUBLIC_API}${endpoints['donate/other']}`,
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
        body: JSON.stringify([
          {
            ...values,
            available_from:
              values.available_until &&
              new Date(values.available_until).toISOString(),
            available_until:
              values.available_until &&
              new Date(values.available_until).toISOString(),
            expiration_date:
              values.expiration_date &&
              new Date(values.expiration_date).toISOString(),
          },
        ]),
      }
    )

    if (res.ok) {
      setServerErrors({})
      const [data] = await res.json()
    } else {
      const [data] = await res.json()
      setServerErrors(data)
    }
  }

  console.log('serverErrors', serverErrors)

  return (
    <section
      className={clsx(
        'container grid place-items-start',
        'bg-blue-50 rounded',
        'mx-auto px-8 py-7'
      )}
    >
      <h3 className="text-sm">{`${t('describeTheResource')}:`}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={'flex space-x-4'}>
          <DateInput
            label={t('signup.other.available_from')}
            value={today}
            errors={
              serverErrors['available_from']
                ? { message: serverErrors['available_from'].join('\n') }
                : errors['available_from']
            }
            {...register('available_from')}
          />
          <DateInput
            value={today}
            label={t('signup.other.available_until')}
            errors={
              serverErrors['available_until']
                ? { message: serverErrors['available_until'].join('\n') }
                : errors['available_until']
            }
            {...register('available_until')}
          />
        </div>
        <div className={'flex space-x-4'}>
          <Dropdown
            label={t('signup.other.county_coverage')}
            errors={
              serverErrors['county_coverage']
                ? { message: serverErrors['county_coverage'].join('\n') }
                : errors['county_coverage']
            }
            {...register('county_coverage')}
          >
            {countyCovarage.map(
              ({
                value,
                display_name,
              }: {
                value: string
                display_name: string
              }) => (
                <option key={value} value={value}>
                  {display_name}
                </option>
              )
            )}
          </Dropdown>
          <Input
            label={t('signup.other.town')}
            {...register('town')}
            errors={
              serverErrors['town']
                ? { message: serverErrors['town'].join('\n') }
                : errors['town']
            }
          />
        </div>
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
        <Input
          label={t('signup.other.name')}
          {...register('name')}
          errors={
            serverErrors['name']
              ? { message: serverErrors['name'].join('\n') }
              : errors['name']
          }
        />
        <DateInput
          label={t('signup.other.expiration_date')}
          errors={
            serverErrors['expiration_date']
              ? { message: serverErrors['expiration_date'].join('\n') }
              : errors['expiration_date']
          }
          {...register('expiration_date')}
        />
        {/*TODO: remove*/}
        <button type={'submit'}>Send</button>
      </form>
    </section>
  )
}

export default OtherResourcesForm
