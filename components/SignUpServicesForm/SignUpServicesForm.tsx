import * as yup from 'yup'
import clsx from 'clsx'
import { SchemaOf } from 'yup'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import Checkbox from '@/components/Form/Checkbox'
import Dropdown from '@/components/Form/Dropdown'
import Input from '@/components/Form/Input'
import Radio from '@/components/Form/Radio'
import RadioGroup from '@/components/Form/RadioGroup'
import { useServicesForm } from '@/hooks/useData'
import { useMemo } from 'react'
import { GoodsTransportServicesRequest } from 'api'
import { date } from 'yup/lib/locale'

type ServicesForm = {
  transportGoods?: boolean;
  capacity?: number;
  hasRefrigeration?: boolean | null;
  transportType?: string;
  transportCounty?: string;
  tgDriverName?: string;
  tgDriverCI?: string;
  tgCarPlate?: string;
  transportPersons?: boolean;
  personsNo?: number;
  withDisabilities?: boolean | null;
  withPets?: boolean | null;
  transportPersonsType?: string;
  transportPersonsCounty?: string;
  tpDriverName?: string;
  tpDriverCI?: string;
  tpCarPlate?: string;
};

const SignUpServicesForm = () => {
  const { t } = useTranslation()
  const { data } = useServicesForm()

  const transportGoodsSchema = yup.object().shape({
    transportGoods: yup.boolean().notRequired(),
    capacity: yup.number().when('transportGoods', {
      is: true,
      then: yup.number().required()
    }),
    hasRefrigeration: yup.boolean().nullable().when('transportGoods', {
      is: true,
      then: yup.boolean().nullable().required()
    }),
    transportType: yup.string().when('transportGoods', {
      is: true,
      then: yup.string().required()
    }),
    transportCounty: yup.string().when('transportType', {
      is: 'county',
      then: yup.string().required('Selectați un județ')
    }),
    tgDriverName: yup.string().when('transportGoods', {
      is: true,
      then: yup.string().required()
    }),
    tgDriverCI: yup.string().when('transportGoods', {
      is: true,
      then: yup.string().required()
    }),
    tgCarPlate: yup.string().when('transportGoods', {
      is: true,
      then: yup.string().required()
    }),
  });

  const transportPersonsSchema = yup.object().shape({
    transportPersons: yup.boolean().notRequired(),
    personsNo: yup.number().when('transportPersons', {
      is: true,
      then: yup.number().required()
    }),
    withDisabilities: yup.boolean().nullable().when('transportPersons', {
      is: true,
      then: yup.boolean().nullable().required()
    }),
    withPets: yup.boolean().nullable().when('transportPersons', {
      is: true,
      then: yup.boolean().nullable().required()
    }),
    transportPersonsType: yup.string().when('transportPersons', {
      is: true,
      then: yup.string().required()
    }),
    transportPersonsCounty: yup.string().when('transportPersonsType', {
      is: 'county',
      then: yup.string().required()
    }),
    tpDriverName: yup.string().when('transportPersons', {
      is: true,
      then: yup.string().required()
    }),
    tpDriverCI: yup.string().when('transportPersons', {
      is: true,
      then: yup.string().required()
    }),
    tpCarPlate: yup.string().when('transportPersons', {
      is: true,
      then: yup.string().required()
    })
  });

  const fullSchema: SchemaOf<ServicesForm> = transportGoodsSchema.concat(transportPersonsSchema);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<ServicesForm>({
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
    mode: 'all'
  })

  const watchTransportType = watch("transportType");
  const watchTransportPersonsType = watch("transportPersonsType");

  const watchTransportGoods = watch('transportGoods', false);
  const watchTransportPersons = watch('transportPersons', false);

  const countiesOptions = useMemo(() => {
    return data?.actions?.POST?.county_coverage?.choices.map((c: any, idx: number) => <option key={idx} value={c.value}>{c.display_name}</option>)
  }, [data]);

  const onSubmit = (data: ServicesForm) => {
    //Preparing object for mutation. The api seems incomplete
    const goodsTransportRequest: GoodsTransportServicesRequest = {
      weight_capacity: data.capacity,
      has_refrigeration: !!data.hasRefrigeration,
      type: data.transportType,
      county_coverage: data.transportCounty,
      driver_name: data.tgDriverName,
      driver_id: data.tgDriverCI,
      car_registration_number: data.tpCarPlate,
    }
  }

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

        <Input type="submit" name="submit" />
      </form>
    </main >
  )
}

export default SignUpServicesForm
