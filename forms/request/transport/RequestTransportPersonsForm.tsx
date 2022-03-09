import Button from '@/components/Button'
import Dropdown from '@/components/Form/Dropdown'
import Input from '@/components/Form/Input'
import Radio from '@/components/Form/Radio'
import Textarea from '@/components/Form/Textarea'
import RadioGroup from '@/components/Form/RadioGroup'
import { useServicesForm } from '@/hooks/useData'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  TransportCategories,
  RequestTransportServicesRequest,
} from 'api'
import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { FormPageProps } from '@/components/FormPage/FormPage'
import { useSelector } from 'react-redux'
import { State } from '@/store/types/state.type'

type ServicesForm = {
  available_seats: number
  category?: string
  from_county: string
  from_city: string
  to_county: string
  to_city: string
  description?: string
  has_disabled_access?: boolean
  pets_allowed: boolean
  type?: string
}

interface IRequestTransportPersonsFormProps {
  onSubmit: (data: RequestTransportServicesRequest) => void
}

export const RequestTransportPersonsForm = ({
  onSubmit,
}: IRequestTransportPersonsFormProps) => {
  const { t } = useTranslation()
  const token: string = useSelector((state: State) => state.auth.token)
  const { data } = useServicesForm(FormPageProps.Request, token)
  const [serverErrors, setServerErrors] = useState<{ [key: string]: string[] }>(
    {}
  )

  const transportPersonsSchema: SchemaOf<ServicesForm> = yup.object().shape({
    available_seats: yup
      .number()
      .typeError(t('error.must.be.number'))
      .required(),
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
    has_disabled_access: yup
      .boolean()
      .typeError(t('error.must.be.boolean'))
      .required(t('validation.required')),
    pets_allowed: yup
      .boolean()
      .typeError(t('error.must.be.boolean'))
      .required(t('validation.required')),
    type: yup.string(),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServicesForm>({
    resolver: yupResolver(transportPersonsSchema),
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
    //Preparing object for mutation. The api seems incomplete
    const personsTransportRequest: RequestTransportServicesRequest = {
      kind: FormPageProps.Request,
      available_seats: data.available_seats,
      has_disabled_access: !!data.has_disabled_access,
      pets_allowed: !!data.pets_allowed,
      from_county: data.from_county,
      from_city: data.from_city,
      to_county: data.to_county,
      to_city: data.to_city,
      description: data.description,
      category: TransportCategories.People,
    }

    onSubmit(personsTransportRequest)
  }

  return (
    <div>
      <form aria-label="form" className="w-full" onSubmit={handleSubmit(onAdd)}>
        <section className="w-full">
          <Input
            label={t('services.available_seats')}
            type={'number'}
            {...register('available_seats')}
          />
          <Textarea
            label={t('services.description')}
            {...register('description')}
          />
          <RadioGroup
            errors={
              serverErrors['has_disabled_access']
                ? { message: serverErrors['has_disabled_access'].join('\n') }
                : errors['has_disabled_access']
            }
            label={t('services.has_disabled_access')}
          >
            <div className={clsx('flex flex-row gap-6')}>
              <Radio value="true" {...register('has_disabled_access')}>
                {t('yes')}
              </Radio>
              <Radio value="false" {...register('has_disabled_access')}>
                {t('no')}
              </Radio>
            </div>
          </RadioGroup>
          <RadioGroup
            errors={
              serverErrors['pets_allowed']
                ? { message: serverErrors['pets_allowed'].join('\n') }
                : errors['pets_allowed']
            }
            label={t('services.pets_allowed')}
          >
            <div className={clsx('flex flex-row gap-6')}>
              <Radio value="true" {...register('pets_allowed')}>
                {t('yes')}
              </Radio>
              <Radio value="false" {...register('pets_allowed')}>
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
            className={'w-1/2'}
            label={t('signup.other.town')}
            {...register('from_city')}
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
            className={'w-1/2'}
            label={t('signup.other.town')}
            {...register('to_city')}
          />
        </section>
        <Button type="submit" text={t('add')} variant="tertiary" size="small" />
      </form>
    </div>
  )
}
