import Input from "@/components/Form/Input";
import { useTranslation } from "react-i18next";
import { FC } from "react";

const Product: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Input
        name="products_food_name"
        label={t('signup.products.food.name')}
        labelPosition="horizontal"
      />
      <button>+</button>
    </div>
  )
}

export default Product;
