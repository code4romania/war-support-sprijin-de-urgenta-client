import Input from "@/components/Form/Input";
import Dropdown from "@/components/Form/Dropdown";
import { useTranslation } from "react-i18next";

const GenericProduct = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Input
        name="products_food_name"
        label={t('signup.products.food.name')}
        labelPosition="horizontal"
      />
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
      <Input
        type="date"
        name="product_food_expire_date"
        label={t('signup.products.food.expire_date')}
      />
      <div className="flex">
        <Dropdown name="product_food_county">
          <option>Cluj</option>
        </Dropdown>
        <Dropdown name="product_food_city">
          <option>Cluj Napoca</option>
        </Dropdown>
      </div>
    </div>
  )
}

export default GenericProduct;
