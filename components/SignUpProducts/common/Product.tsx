import Input from "@/components/Form/Input";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import { ResourceType } from "@/components/SignUpProducts/types";

interface IProps {
  resourceType: ResourceType;
  register: any
  errors: any
}

const Product: FC<IProps> = ({
  resourceType,
  register,
  errors
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <Input
        label={t('signup.products.product')}
        labelPosition="horizontal"
        error={errors['name']}
        {...register('name')}
      />
    </div>
  )
}

export default Product;
