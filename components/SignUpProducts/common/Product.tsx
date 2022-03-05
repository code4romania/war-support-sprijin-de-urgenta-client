import Input from "@/components/Form/Input";
import { PartialRecord } from "@/components/Form/types";
import { ErrorOption, Path, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";

type RecordKey = 'name';

interface IProps<TFormValues> {
  errors?: PartialRecord<Path<TFormValues>, ErrorOption | ErrorOption[]>
  register: UseFormRegister<TFormValues>
  names: Record<RecordKey, Path<TFormValues>>
}

const Product = <TFormValues extends PartialRecord<RecordKey, unknown>>({
  errors,
  register,
  names
}: IProps<TFormValues>) => {
  const { t } = useTranslation();

  return (
    <div>
      <Input
        label={t('signup.products.product')}
        labelPosition="horizontal"
        errors={errors && errors[names.name]}
        {...register(names.name)}
      />
    </div>
  )
}

export default Product;
