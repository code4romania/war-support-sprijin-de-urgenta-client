import Checkbox from "@/components/Form/Checkbox";
import CategoryWrapper from "@/components/SignUpProducts/common/CategoryWrapper";
import Separator from "@/components/SignUpProducts/common/Separator";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const SignupProducts: FC = () => {
  const {t} = useTranslation();

  return (
    <div>
      <CategoryWrapper>
        <Checkbox
          name="products_food"
        >
          {t('signup.products.food')}
        </Checkbox>
      </CategoryWrapper>

      <Separator/>

      <CategoryWrapper>
        <Checkbox name="products_generalHygiene">
          {t('signup.products.generalHygiene')}
        </Checkbox>
      </CategoryWrapper>

      <Separator/>

      <CategoryWrapper>
        <Checkbox name="products_feminineHygiene">
          {t('signup.products.feminineHygiene')}
        </Checkbox>
      </CategoryWrapper>

      <Separator/>

      <CategoryWrapper>
        <Checkbox name="products_textile">
          {t('signup.products.textile')}
        </Checkbox>
      </CategoryWrapper>

      <Separator/>

      <CategoryWrapper>
        <Checkbox name="products_buildingMaterials">
          {t('signup.products.buildingMaterials')}
        </Checkbox>
      </CategoryWrapper>

      <Separator/>

      <CategoryWrapper>
        <Checkbox name="products_tents">
          {t('signup.products.tents')}
        </Checkbox>
      </CategoryWrapper>

      <Separator/>


    </div>
  )
}

export default SignupProducts;
