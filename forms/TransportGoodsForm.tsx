import Button from '@/components/Button'
import Checkbox from '@/components/Form/Checkbox'
import CheckboxGroup from '@/components/Form/CheckboxGroup'
import Dropdown from '@/components/Form/Dropdown'
import Input from '@/components/Form/Input'
import Radio from '@/components/Form/Radio'
import RadioGroup from '@/components/Form/RadioGroup'
import { useServicesForm } from '@/hooks/useData'
import { yupResolver } from '@hookform/resolvers/yup'
import { TransportServicesRequest } from 'api'
import clsx from 'clsx'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { SchemaOf } from 'yup'


type ServicesForm = {
  capacity: number;
  hasRefrigeration: boolean | null;
  transportType: string | null;
  transportCounty?: string;
  availability: string[];
  driverName: string;
  driverCI: string;
  tgdriverCI: string;
};

interface ITransportGoodsFormProps {
  onSubmit: (data: TransportServicesRequest) => void;
}

export const TransportGoodsForm = ({ onSubmit }: ITransportGoodsFormProps) => {
  const { t } = useTranslation();
  const { data } = useServicesForm();

  const transportGoodsSchema: SchemaOf<ServicesForm> = yup.object().shape({
    capacity: yup.number().typeError(t('error.must.be.number')).required(t('error.capacity.required')),
    hasRefrigeration: yup.boolean().nullable().required(t('error.refrigeration.required')),
    transportType: yup.string().nullable().required(t('error.transportType.required')),
    transportCounty: yup.string().when('transportType', {
      is: 'county',
      then: yup.string().required(t('error.county.required'))
    }),
    availability: yup.array().of(yup.string().required()),
    driverName: yup.string().required(t('error.driverName.required')),
    driverCI: yup.string().required(t('error.driverCI.required')),
    tgdriverCI: yup.string().required(t('error.driverdriverCI.required')),
  });

  const { register, handleSubmit, formState: { errors }, watch } = useForm<ServicesForm>({
    defaultValues: {
      capacity: 0,
    },
    resolver: yupResolver(transportGoodsSchema),
    reValidateMode: 'onSubmit',
    mode: 'all'
  })

  const watchTransportType = watch("transportType");

  const countiesOptions = useMemo(() => {
    return data?.county_coverage?.choices.map((c: any, idx: number) => <option key={idx} value={c.value}>{c.display_name}</option>)
  }, [data?.county_coverage?.choices]);

  const availabilityOptions = useMemo(() => {
    return data?.availability?.choices.map((c: any, idx: number) => (
      <Checkbox
        key={idx}
        {...register('availability')}
        value={c.value}
      >
        {c.display_name}
      </Checkbox>
    ));
  }, [data?.availability?.choices, register]);

  const onAdd = (data: ServicesForm) => {
    //Preparing object for mutation. The api seems incomplete
    const goodsTransportRequest: TransportServicesRequest = {
      weight_capacity: data.capacity,
      has_refrigeration: !!data.hasRefrigeration,
      type: data.transportType ?? '',
      county_coverage: data.transportCounty,
      driver_name: data.driverName,
      driver_id: data.driverCI,
    }
    console.log(data);
    
    //TODO: we don't really need to send it upwards, we can POST here since it takes only one entry ATM.
    //TODO: if the API will receive an array then it makes sense to send data upwards
    onSubmit(goodsTransportRequest);
  }

  return (
    <div>
      <form aria-label='form' className='w-full' onSubmit={handleSubmit(onAdd)}>
        <section className='w-full'>
          <div className={clsx('flex flex-row items-center gap-x-2')}>
            <Input
              type="number"
              labelPosition='horizontal'
              label={t('services.capacity')}
              {...register('capacity')}
              errors={errors.capacity}
            />
            <span className={clsx('px-1 pb-5')}>{t('unit.tons')}</span>
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
            <Radio value="county" {...register('transportType')} className={clsx('mb-0')}>
              <Dropdown {...register('transportCounty')}
                disabled={watchTransportType !== 'county'}
                errors={errors.transportCounty}
                placeholder={t('services.county.placeholder')}
              >
                {countiesOptions}
              </Dropdown>
            </Radio>
          </RadioGroup>


          <Input
            labelPosition='horizontal'
            type="text"
            errors={errors.driverName}
            label={t('services.driver-name')}
            {...register('driverName')}
          />
          <Input
            labelPosition='horizontal'
            type="text"
            errors={errors.driverCI}
            label={t('services.driver-ci')}
            {...register('driverCI')}
          />
          <Input
            labelPosition='horizontal'
            type="text"
            errors={errors.tgdriverCI}
            label={t('services.car-plate')}
            {...register('tgdriverCI')}
          />

          <CheckboxGroup
            errors={errors.availability}
            label={t('services.availability')}
          >
            {availabilityOptions}
          </CheckboxGroup>
        </section>
        <Button type="submit" text={t('add')} variant="tertiary" size="small" />
      </form>
    </div>
  )
}