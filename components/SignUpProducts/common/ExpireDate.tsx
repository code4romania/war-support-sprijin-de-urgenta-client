import Input from "@/components/Form/Input";
import { ResourceType } from "@/components/SignUpProducts/types";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  resourceType: ResourceType;
  register: any
  errors: any
}

const ExpireDate: FC<IProps> = ({
  resourceType,
  register,
  errors
}) => {
  const { t } = useTranslation();

  return (
    <Input
      type="date"
      label={t('signup.products.expireDate')}
      labelPosition="horizontal"
      {...register('expiration_date')}
    />
  )
}

export default ExpireDate;
