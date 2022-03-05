import Input from "@/components/Form/Input";
import { PartialRecord } from "@/components/Form/types";
import { ResourceType } from "@/components/SignUpProducts/types";
import { ErrorOption, Path, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";

type RecordKey = 'expiration_date';
interface IProps<TFormValues> {
  resourceType: ResourceType;
  register: UseFormRegister<TFormValues>
  errors?: PartialRecord<Path<TFormValues>, ErrorOption | ErrorOption[] | undefined>
  names: Record<RecordKey, Path<TFormValues>>
}

const ExpireDate = <TFormValues extends PartialRecord<RecordKey, unknown>>({
  resourceType,
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
