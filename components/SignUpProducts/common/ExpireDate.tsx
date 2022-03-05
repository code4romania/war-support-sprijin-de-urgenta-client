import Input from "@/components/Form/Input";
import { PartialRecord } from "@/components/Form/types";
import { ErrorOption, Path, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";

type RecordKey = 'expiration_date';
interface IProps<TFormValues> {
  register: UseFormRegister<TFormValues>
  errors?: PartialRecord<Path<TFormValues>, ErrorOption | ErrorOption[]>
  names: Record<RecordKey, Path<TFormValues>>
}

const ExpireDate = <TFormValues extends PartialRecord<RecordKey, unknown>>({
  register,
  errors,
  names
}: IProps<TFormValues>) => {
  const { t } = useTranslation();

  return (
    <Input
      type="date"
      label={t('signup.products.expireDate')}
      labelPosition="horizontal"
      {...register && register(names.expiration_date)}
      errors={errors && errors[names.expiration_date]}
    />
  )
}

export default ExpireDate;
