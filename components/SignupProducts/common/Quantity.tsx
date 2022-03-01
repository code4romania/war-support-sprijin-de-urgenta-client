import Input from "@/components/Form/Input";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const Quantity: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex">
      <Input
        name="products_food_qty"
        type="number"
        label={t('signup.products.food.qty')}
        labelPosition="horizontal"
      />
      <Input
        name="products_food_packaging"
        label={t('signup.products.food.packaging')}
        labelPosition="horizontal"
      />
    </div>
  )
}

export default Quantity;
