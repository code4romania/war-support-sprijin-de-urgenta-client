import Checkbox from '@/components/Form/Checkbox'
import Dropdown from '@/components/Form/Dropdown'
import Input from '@/components/Form/Input'
import Radio from '@/components/Form/Radio'
import RadioGroup from '@/components/Form/RadioGroup'
import { yupResolver } from '@hookform/resolvers/yup'
import { GoodsTransportServicesRequest } from 'api'
import clsx from 'clsx'
import { useOptions } from 'hooks/useOptions'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { SchemaOf } from 'yup'


type ServicesForm = {
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
interface ITransportPersonsFormProps {
  onSubmit: () => void;
}
export const TransportPersonsForm = ({ onSubmit }: ITransportPersonsFormProps) => {
  const { t } = useTranslation();
  const { data } = useOptions('/donate/transport_service')

  const transportPersonsSchema: SchemaOf<ServicesForm> = yup.object().shape({
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

  const { register, handleSubmit, formState: { errors }, watch } = useForm<ServicesForm>({
    defaultValues: {
      transportPersons: false,
      transportPersonsType: '',
      personsNo: 0
    },
    resolver: yupResolver(transportPersonsSchema),
    reValidateMode: 'onSubmit',
    mode: 'all'
  })

  const watchTransportPersonsType = watch("transportPersonsType");

  const countiesOptions = useMemo(() => {
    return data?.actions?.POST?.county_coverage?.choices.map((c: any, idx: number) => <option key={idx} value={c.value}>{c.display_name}</option>)
  }, [data]);

  const onSave = (data: ServicesForm) => {
    //Preparing object for mutation. The api seems incomplete
    // const goodsTransportRequest: GoodsTransportServicesRequest = {
    //   weight_capacity: data.capacity,
    //   has_refrigeration: !!data.hasRefrigeration,
    //   type: data.transportType,
    //   county_coverage: data.transportCounty,
    //   driver_name: data.tgDriverName,
    //   driver_id: data.tgDriverCI,
    //   car_registration_number: data.tpCarPlate,
    // }
  }

  return (
    <form className='w-full' onSubmit={handleSubmit(onSave)}>
      <div className='flex flex-col w-full md:flex-row'>
        <section className='flex-1'>
          <Checkbox
            value={"true"}
            {...register('transportPersons')}
            errors={errors.transportPersons}
          >
            {t('services.transport-persons')}
          </Checkbox>
          <div className={clsx('flex flex-row items-center gap-x-2')}>
            <Input
              type="number"
              labelPosition='horizontal'
              label={t('services.persons-number')}
              {...register('personsNo')}
              errors={errors.personsNo}
            />
            <span className={clsx('pb-5')}>{t('unit.persons')}</span>
          </div>

          <RadioGroup
            errors={errors.withDisabilities}
            label={t('services.with-disabilities')}
          >
            <div className={clsx('flex flex-row gap-6')}>
              <Radio
                value="true"
                {...register('withDisabilities')}
              >
                {t('yes')}
              </Radio>
              <Radio
                value="false"
                {...register('withDisabilities')}
              >
                {t('no')}
              </Radio>
            </div>
          </RadioGroup>

          <RadioGroup
            errors={errors.withPets}
            label={t('services.with-pets')}
          >
            <div className={clsx('flex flex-row gap-6')}>
              <Radio
                value="true"
                {...register('withPets')}
              >
                {t('yes')}
              </Radio>
              <Radio
                value="false"
                {...register('withPets')}
              >
                {t('no')}
              </Radio>
            </div>
          </RadioGroup>

          <RadioGroup
            errors={errors.transportPersonsType}
            label={t('services.transport')}
          >
            <Radio
              value="national"
              {...register('transportPersonsType')}
            >
              {t('services.transport-type.national')}
            </Radio>
            <Radio value="county" {...register('transportPersonsType')}>
              <Dropdown {...register('transportPersonsCounty')} disabled={watchTransportPersonsType !== 'county'}>
                {countiesOptions}
              </Dropdown>
            </Radio>
          </RadioGroup>

          <Input
            labelPosition='horizontal'
            type="text"
            errors={errors.tpDriverName}
            label={t('services.driver-name')}
            {...register('tpDriverName')}
          />
          <Input
            labelPosition='horizontal'
            type="text"
            errors={errors.tpDriverCI}
            label={t('services.driver-ci')}
            {...register('tpDriverCI')}
          />
          <Input
            labelPosition='horizontal'
            type="text"
            errors={errors.tpCarPlate}
            label={t('services.car-plate')}
            {...register('tpCarPlate')}
          />
        </section>
      </div>
      {/* {TODO: remove this button once integrated} */}
      <Input type='submit' name={'submit'} />
    </form>
  )
}
