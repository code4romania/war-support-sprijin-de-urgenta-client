import Input from "@/components/Form/Input";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import { ResourceType } from "@/components/SignUpProducts/types";
import clsx from "clsx";

interface IProps {
  resourceType: ResourceType;
}

const Product: FC<IProps> = ({
  resourceType,
}) => {
  const { t } = useTranslation();

  return (
    <div className={clsx('flex items-center')}>
      <Input
        name={`products_${resourceType}_name`}
        label={t('signup.products.product')}
        labelPosition="horizontal"
      />
      <button
        className={clsx(
          'bg-white',
          'w-8 h-8 ml-4 mb-5',
          'border-2 rounded-2xl border-dashed border-gray-300'
        )}
      >
        +
      </button>
    </div>
  )
}

export default Product;
