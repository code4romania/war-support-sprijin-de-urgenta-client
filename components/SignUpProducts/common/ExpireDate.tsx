import Input from "@/components/Form/Input";
import { ResourceType } from "@/components/SignUpProducts/types";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  resourceType: ResourceType;
}

const ExpireDate: FC<IProps> = ({
  resourceType,
}) => {
  const { t } = useTranslation();

  return (
    <Input
      type="date"
      name={`product_${resourceType}_expire_date`}
      label={t('signup.products.expireDate')}
      labelPosition="horizontal"
    />
  )
}

export default ExpireDate;
