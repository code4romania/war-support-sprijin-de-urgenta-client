import Button from '@/components/Button'
import Checkbox from '@/components/Form/Checkbox'
import CheckboxGroup from '@/components/Form/CheckboxGroup'
import Dropdown from '@/components/Form/Dropdown'
import Input from '@/components/Form/Input'
import Radio from '@/components/Form/Radio'
import RadioGroup from '@/components/Form/RadioGroup'
import { useServicesForm } from '@/hooks/useData'
import { phoneNumberRegex, roCarRegistrationNumber, roIdentityCardRegex } from '@/utils/regexes'
import { yupResolver } from '@hookform/resolvers/yup'
import { TransportServicesRequest, TransportType } from 'api/types'
import clsx from 'clsx'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { SchemaOf } from 'yup'

type ServicesForm = {
  personsNo: number;
  withDisabilities: boolean | null;
  withPets: boolean | null;
  transportType: string;
  transportCounty?: string;
  availability: string[];
  driverName: string;
  driverCI: string;
  carPlate: string;
  driverContact: string;
};
interface ITransportPersonsFormProps {
  onSubmit: (data: TransportServicesRequest) => void;
}
export const TransportPersonsForm = ({ onSubmit }: ITransportPersonsFormProps) => {
  const { t } = useTranslation();
  const { data } = useServicesForm();

  const transportPersonsSchema: SchemaOf<ServicesForm> = yup.object().shape({
    personsNo: yup.number().required(),
    withDisabilities: yup.boolean().nullable().required(),
    withPets: yup.boolean().nullable().required(),
    transportType: yup.string().required(t('error.transportType.required')),
    transportCounty: yup.string().when('transportType', {
      is: 'county',
      then: yup.string().required(t('error.county.required'))
    }),
    availability: yup.array().nullable().min(1, t('error.availability.minOne')).of(yup.string().required()),
    driverName: yup.string().required(t('error.driverName.required')),
    driverCI: yup.string().required(t('error.driverCI.required')).matches(roIdentityCardRegex, t('error.driverCI.invalid')),
    carPlate: yup.string().required(t('error.carRegistration.required')).matches(roCarRegistrationNumber, t('error.carRegistation.invalid')),
    driverContact: yup.string().required(t('error.driverContact.required')).matches(phoneNumberRegex, t('error.driverContact.invalid'))
  });

  const { register, handleSubmit, formState: { errors }, watch } = useForm<ServicesForm>({
    defaultValues: {
      transportType: '',
      personsNo: 0,
      availability: []
    },
    resolver: yupResolver(transportPersonsSchema),
    reValidateMode: 'onSubmit',
    mode: 'all'
  })

  const watchtransportType = watch("transportType");

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

  const typeOptions: { value: number, display_name: string }[] = data?.type?.choices;

  const onSave = (data: ServicesForm) => {
    //Preparing object for mutation. The api seems incomplete
    const personsTransportRequest: TransportServicesRequest = {
      type: data.transportType,
      has_disabled_access: !!data.withDisabilities,
      pets_allowed: !!data.withPets,
      county_coverage: data.transportCounty,
      driver_name: data.driverName,
      driver_id: data.driverCI,
      car_registration_number: data.carPlate,
      driver_contact: data.driverContact
    }

    //TODO: we don't really need to send it upwards, we can POST here since it takes only one entry ATM.
    //TODO: if the API will receive an array then it makes sense to send data upwards
    onSubmit(personsTransportRequest);
  }

  return (
    <form className='w-full' onSubmit={handleSubmit(onSave)}>
      <section className='w-full'>
        <div className={clsx('flex flex-row items-center gap-x-2')}>
          <Input
            type="number"
            labelPosition='horizontal'
            label={t('services.persons-number')}
            {...register('personsNo')}
            errors={errors.personsNo}
          />
          <span className={clsx('px-1 pb-5')}>{t('unit.persons')}</span>
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
          errors={errors.transportType}
          label={t('services.transport')}
        >
          <Radio
            value={typeOptions[0].value}
            {...register('transportType')}
          >
            {typeOptions[0].display_name}
          </Radio>
          <Radio value={typeOptions[1].value} {...register('transportType')}>
            <Dropdown placeholder={t('services.county.placeholder')} {...register('transportCounty')} disabled={watchtransportType !== TransportType.County}>
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
          errors={errors.carPlate}
          label={t('services.car-plate')}
          {...register('carPlate')}
        />
        <Input
          labelPosition='horizontal'
          type="text"
          errors={errors.driverContact}
          label={t('services.driverContact')}
          {...register('driverContact')}
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
  )
}
