import { FC } from 'react'
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

const SignupVolunteering: FC = () => {
  const { t } = useTranslation()
  const { data: formData } = useVolunteeringForm()
  const { data: categories } = useData(endpoints['categories/volunteering'])
  const countyCovarage = formData ? formData['county_coverage'].choices : []
  const today = new Date().toISOString().substr(0, 10)
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues:{
      available_until: today
    }
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
          <Dropdown
            label={t('signup.volunteering.county_coverage')}
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
