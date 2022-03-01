import Input from "@/components/Form/Input";
import Dropdown from "@/components/Form/Dropdown";
import { useTranslation } from "react-i18next";
import Location from "@/components/SignupProducts/common/Location";
import Quantity from "@/components/SignupProducts/common/Quantity";
import Product from "@/components/SignupProducts/common/Product";

const GenericProduct = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Product />

      <Quantity />

      <Input
        type="date"
        name="product_food_expire_date"
        label={t('signup.products.food.expire_date')}
      />

      <Location />
    </div>
  )
}

export default GenericProduct;
