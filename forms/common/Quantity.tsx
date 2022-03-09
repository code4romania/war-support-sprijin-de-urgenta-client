import Input from '@/components/Form/Input';
import { PartialRecord } from '@/components/Form/types';
import { ErrorOption, Path, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type RecordKey = 'quantity' | 'unit_type' | 'packaging_type';
interface IProps<TFormValues> {
  register: UseFormRegister<TFormValues>
  errors?: PartialRecord<Path<TFormValues>, ErrorOption | ErrorOption[]>
  names: Record<RecordKey, Path<TFormValues>>
}

const Quantity = <TFormValues extends PartialRecord<RecordKey, unknown>>({
  register,
  errors,
  names
}: IProps<TFormValues>) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col justify-start space-y-2">
      <Input
        type="number"
        label={t('signup.products.qty')}
        labelPosition="horizontal"
        {...register && register(names.quantity)}
        errors={errors && errors[names.quantity]}
      />

      <Input
        label={t('signup.products.unit_type')}
        labelPosition="horizontal"
        {...register && register(names.unit_type)}
        errors={errors && errors[names.unit_type]}
      />

      <Input
        label={t('signup.products.packaging')}
        labelPosition="horizontal"
        {...register && register(names.packaging_type)}
        errors={errors && errors[names.packaging_type]}
      />
    </div>
  )
}

export default Quantity
