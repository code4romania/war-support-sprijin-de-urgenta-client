import Button from '@/components/Button'
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
  transportGoods?: boolean;
  capacity?: number;
  hasRefrigeration?: boolean | null;
  transportType?: string;
  transportCounty?: string;
  tgDriverName?: string;
  tgDriverCI?: string;
  tgCarPlate?: string;
};

interface ITransportGoodsFormProps {
  onSubmit: (data: GoodsTransportServicesRequest) => void;
}
export const TransportGoodsForm = ({ onSubmit }: ITransportGoodsFormProps) => {
  const { t } = useTranslation();
  const { data } = useOptions('/donate/transport_service')
  console.log(data);
  const transportGoodsSchema: SchemaOf<ServicesForm> = yup.object().shape({
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

  const { register, handleSubmit, formState: { errors }, watch } = useForm<ServicesForm>({
    defaultValues: {
      transportGoods: false,
      capacity: 0,
      transportType: '',
    },
    resolver: yupResolver(transportGoodsSchema),
    reValidateMode: 'onSubmit',
    mode: 'all'
  })

  const watchTransportType = watch("transportType");

  const countiesOptions = useMemo(() => {
    return data?.actions?.POST?.county_coverage?.choices.map((c: any, idx: number) => <option key={idx} value={c.value}>{c.display_name}</option>)
  }, [data]);

  const onAdd = (data: ServicesForm) => {
    //Preparing object for mutation. The api seems incomplete
    const goodsTransportRequest: GoodsTransportServicesRequest = {
      weight_capacity: data.capacity,
      has_refrigeration: !!data.hasRefrigeration,
      type: data.transportType,
      county_coverage: data.transportCounty,
      driver_name: data.tgDriverName,
      driver_id: data.tgDriverCI,
    }

    onSubmit(goodsTransportRequest);
  }

  return (
    <form aria-label='form' className='w-full' onSubmit={handleSubmit(onAdd)}>
      <section className='flex flex-col w-full md:flex-row'>
        <div className={clsx('flex flex-row items-center gap-x-2')}>
          <Input
            type="number"
            labelPosition='horizontal'
            label={t('services.capacity')}
            {...register('capacity')}
            errors={errors.capacity}
          />
          <span className={clsx('pb-5')}>{t('unit.tons')}</span>
        </div>

        <RadioGroup
          errors={errors.hasRefrigeration}
          label={t('services.cooling')}
        >
          <div className={clsx('flex flex-row gap-6')}>
            <Radio
              value="true"
              {...register('hasRefrigeration')}
            >
              {t('yes')}
            </Radio>
            <Radio
              value="false"
              {...register('hasRefrigeration')}
            >
              {t('no')}
            </Radio>
          </div>
        </RadioGroup>

        <RadioGroup
          errors={errors.transportType}
          label={t('services.transport')}
        >
          <Radio
            value="national"
            {...register('transportType')}
          >
            {t('services.transport-type.national')}
          </Radio>
          <Radio value="county" {...register('transportType')}>
            <Dropdown {...register('transportCounty')} disabled={watchTransportType !== 'county'}>
              {countiesOptions}
            </Dropdown>
          </Radio>
        </RadioGroup>


        <Input
          labelPosition='horizontal'
          type="text"
          errors={errors.tgDriverName}
          label={t('services.driver-name')}
          {...register('tgDriverName')}
        />
        <Input
          labelPosition='horizontal'
          type="text"
          errors={errors.tgDriverCI}
          label={t('services.driver-ci')}
          {...register('tgDriverCI')}
        />
        <Input
          labelPosition='horizontal'
          type="text"
          errors={errors.tgCarPlate}
          label={t('services.car-plate')}
          {...register('tgCarPlate')}
        />
      </section>
      {/* <Button type="submit" text={t('add')} variant="tertiary" size="small" /> */}
    </form>
  )
}