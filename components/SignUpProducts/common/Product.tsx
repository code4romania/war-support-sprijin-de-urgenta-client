import Input from "@/components/Form/Input";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import { ResourceType } from "@/components/SignUpProducts/types";

interface IProps {
  resourceType: ResourceType;
}

const Product: FC<IProps> = ({
  resourceType,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <Input
        name={`products_${resourceType}_name`}
        label={t('signup.products.product')}
        labelPosition="horizontal"
      />
    </div>
  )
}

export default Product;
