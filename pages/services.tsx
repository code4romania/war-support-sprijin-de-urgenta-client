import Checkbox from '@/components/Form/Checkbox'
import Dropdown from '@/components/Form/Dropdown'
import Input from '@/components/Form/Input'
import Radio from '@/components/Form/Radio'
import { yupResolver } from '@hookform/resolvers/yup'
import clsx from 'clsx'
import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { SchemaOf } from 'yup'
import RadioGroup from '@/components/Form/RadioGroup'

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

const ServicesPage: NextPage = () => {
  const { t } = useTranslation()

  const transportGoodsSchema = yup.object().shape({
    transportGoods: yup.boolean().notRequired(),
    capacity: yup.number().when('transportGoods', {
      is: true,
      then: yup.number().required(),
    }),
    needCooling: yup.boolean().nullable().when('transportGoods', {
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
    tgDriverName: yup.string().when('transportGoods', {
      is: true,
      then: yup.string().required(),
    }),
    tgDriverCI: yup.string().when('transportGoods', {
      is: true,
      then: yup.string().required(),
    }),
    tgCarPlate: yup.string().when('transportGoods', {
      is: true,
      then: yup.string().required(),
    }),

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServicesForm>({
    defaultValues: {
      transportGoods: false,
      capacity: 0,
      transportType: '',
      transportPersons: false,
      transportPersonsType: '',
      personsNo: 0
    },
    resolver: yupResolver(fullSchema),
    reValidateMode: 'onSubmit',
    mode: 'all',
  })

  const onSubmit = (data: ServicesForm) => console.log(data)
  console.log(errors);
  return (
    <main
      className={clsx(
        'container grid place-items-start',
        'bg-blue-50 rounded',
        'mx-auto px-8 py-7'
      )}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Checkbox
          value={'true'}
          {...register('transportGoods')}
          errors={errors.transportGoods}
        >
          {t('services.transport-goods')}
        </Checkbox>
        <section className="ml-6">
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
            </div>
          </RadioGroup>

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
            errors={errors.tgDriverName}
            label={t('services.driver-name')}
            {...register('tgDriverName')}
          />
          <Input
            labelPosition="horizontal"
            type="text"
            errors={errors.tgDriverCI}
            label={t('services.driver-ci')}
            {...register('tgDriverCI')}
          />
          <Input
            labelPosition="horizontal"
            type="text"
            errors={errors.tgCarPlate}
            label={t('services.car-plate')}
            {...register('tgCarPlate')}
          />
        </section>

        <Input type="submit" name="submit" />
      </form>
    </main>
  )
}

export default ServicesPage

