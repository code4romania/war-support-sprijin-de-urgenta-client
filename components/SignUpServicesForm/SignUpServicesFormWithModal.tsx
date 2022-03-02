import { useState } from 'react'
import * as yup from 'yup'
import clsx from 'clsx'
import { SchemaOf } from 'yup'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'

import Dropdown from '@/components/Form/Dropdown'
import Input from '@/components/Form/Input'
import Radio from '@/components/Form/Radio'
import RadioGroup from '@/components/Form/RadioGroup'
import Button from '@/components/Button'
import Dialog from '../Dialog'

type ServicesForm = {
  transportGoods: boolean
  capacity?: number
  needCooling?: boolean
  transportType?: string
  transportCounty?: string
  driverName?: string
  driverCI?: string
  carPlate?: string
}

const SignUpServicesFormWithModal = () => {
  const { t } = useTranslation()

  const [showDialog, setShowDialog] = useState(false)

  const schema: SchemaOf<ServicesForm> = yup.object().shape({
    transportGoods: yup.boolean().required(),
    capacity: yup.number().when('transportGoods', {
      is: true,
      then: yup.number().required(),
    }),
    needCooling: yup.boolean().when('transportGoods', {
      is: true,
      then: yup.boolean().nullable().required(),
    }),
    transportType: yup.string().when('transportGoods', {
      is: true,
      then: yup.string().required(),
    }),
    transportCounty: yup.string().when('transportType', {
      is: 'county',
      then: yup.string().required('Selectați un județ'),
    }),
    driverName: yup.string().when('transportGoods', {
      is: true,
      then: yup.string().required(),
    }),
    driverCI: yup.string().when('transportGoods', {
      is: true,
      then: yup.string().required(),
    }),
    carPlate: yup.string().when('transportGoods', {
      is: true,
      then: yup.string().required(),
    }),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServicesForm>({
    defaultValues: {
      transportGoods: false,
      capacity: 0,
      transportType: '',
    },
    resolver: yupResolver(schema),
    reValidateMode: 'onSubmit',
    mode: 'all',
  })

  const onSubmit = (data: ServicesForm) => console.log(data)

  return (
    <main
      className={clsx(
        'container grid place-items-start',
        'bg-blue-50 rounded',
        'mx-auto px-8 py-7'
      )}
    >
      <div className="flex items-center gap-4 mb-8">
        <h3 className="min-w-fit">{t('services.transport-goods')}</h3>
        <Button
          text={t('add')}
          size="small"
          variant="tertiary"
          onClick={() => setShowDialog(true)}
        />
      </div>
      <div className="flex items-center gap-4 mb-8">
        <h3 className="min-w-fit">{t('services.transport-people')}</h3>
        <Button
          text={t('add')}
          size="small"
          variant="tertiary"
          onClick={() => setShowDialog(true)}
        />
      </div>

      {/* TODO: The content of the dialog should be dynamically set based on the type of service selected via button  */}
      <Dialog isOpen={showDialog} onDismiss={() => setShowDialog(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section>
            <div className="flex flex-row items-center gap-x-2">
              <Input
                type="number"
                labelPosition="horizontal"
                label={t('services.capacity')}
                {...register('capacity')}
                errors={errors.capacity}
              />
              <span className="pb-5">{t('unit.tons')}</span>
            </div>

            <div className="flex flex-row gap-6">
              <RadioGroup
                errors={errors.needCooling}
                label={t('services.cooling')}
              >
                <Radio value="true" {...register('needCooling')}>
                  {t('yes')}
                </Radio>
                <Radio value="false" {...register('needCooling')}>
                  {t('no')}
                </Radio>
              </RadioGroup>
            </div>

            <RadioGroup
              errors={errors.transportType}
              label={t('services.transport')}
            >
              <Radio value="national" {...register('transportType')}>
                {t('services.transport-type.national')}
              </Radio>
              <Radio value="county" {...register('transportType')}>
                <Dropdown {...register('transportCounty')}>
                  <option value=""></option>
                  <option value="typeA">Type A</option>
                  <option value="typeB">Type B</option>
                </Dropdown>
              </Radio>
            </RadioGroup>

            <Input
              labelPosition="horizontal"
              type="text"
              errors={errors.driverName}
              label={t('services.driver-name')}
              {...register('driverName')}
            />
            <Input
              labelPosition="horizontal"
              type="text"
              errors={errors.driverCI}
              label={t('services.driver-ci')}
              {...register('driverCI')}
            />
            <Input
              labelPosition="horizontal"
              type="text"
              errors={errors.carPlate}
              label={t('services.car-plate')}
              {...register('carPlate')}
            />
          </section>

          <Button
            type="submit"
            text={t('add')}
            variant="tertiary"
            size="small"
          />
        </form>
      </Dialog>
    </main>
  )
}

export default SignUpServicesFormWithModal
