import { FC } from "react";
import { useTranslation } from "react-i18next";
import Checkbox from "@/components/Form/Checkbox";
import GenericProduct from "@/components/SignUpProducts/GenericProduct";
import TextileProduct from "@/components/SignUpProducts/TextileProduct";
import BuildingMaterials from "@/components/SignUpProducts/BuildingMaterials";
import Separator from "@/components/SignUpProducts/common/Separator";
import Tents from "@/components/SignUpProducts/Tents";
import Others from "@/components/SignUpProducts/Others";
import CategoryWrapper from "@/components/SignUpProducts/common/CategoryWrapper";

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
      <TextileProduct resourceType="textile"/>

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

      <CategoryWrapper>
        <Others/>
      </CategoryWrapper>
    </div>
  )
}

export default SignupProducts;
