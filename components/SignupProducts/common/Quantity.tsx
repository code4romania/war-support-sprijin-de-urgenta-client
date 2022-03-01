import Input from "@/components/Form/Input";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ResourceType } from "@/components/SignupProducts/types";


interface IProps {
  resourceType: ResourceType;
}

const Quantity: FC<IProps> = ({
  resourceType,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-start">
      <Input
        name={`products_${resourceType}_qty`}
        type="number"
        label={t('signup.products.qty')}
        labelPosition="horizontal"
        className={"mr-5"}
      />

      <Input
        name={`products_${resourceType}_packaging`}
        label={t('signup.products.packaging')}
        labelPosition="horizontal"
      />
    </div>
  )
}

export default Quantity;
