import { FC } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import Checkbox from "@/components/Form/Checkbox";
import GenericProduct from "@/components/SignupProducts/GenericProduct";
import TextileProduct from "@/components/SignupProducts/TextileProduct";
import BuildingMaterials from "@/components/SignupProducts/BuildingMaterials";
import Separator from "@/components/SignupProducts/common/Separator";
import Tents from "@/components/SignupProducts/Tents";
import Others from "@/components/SignupProducts/Others";
import CategoryWrapper from "@/components/SignupProducts/common/CategoryWrapper";

const SignupProducts: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={clsx('bg-blue-100 bg-opacity-50 rounded-md p-4')}>
      <h2>{t('signup.products.header')}</h2>

      <div>
        <CategoryWrapper>
          <Checkbox
            name="products_food"
          >
            {t('signup.products.food')}
          </Checkbox>
        </CategoryWrapper>
        <GenericProduct resourceType="food" />

        <Separator />

        <CategoryWrapper>
          <Checkbox name="products_generalHygiene">
            {t('signup.products.generalHygiene')}
          </Checkbox>
        </CategoryWrapper>
        <GenericProduct resourceType="generalHygiene" />

        <Separator />

        <CategoryWrapper>
          <Checkbox name="products_feminineHygiene">
            {t('signup.products.feminineHygiene')}
          </Checkbox>
        </CategoryWrapper>
        <GenericProduct resourceType="feminineHygiene" />

        <Separator />

        <CategoryWrapper>
          <Checkbox name="products_textile">
            {t('signup.products.textile')}
          </Checkbox>
        </CategoryWrapper>
        <TextileProduct resourceType="textile" />

        <Separator />

        <CategoryWrapper>
          <Checkbox name="products_buildingMaterials">
            {t('signup.products.buildingMaterials')}
          </Checkbox>
        </CategoryWrapper>
        <BuildingMaterials resourceType="buildingMaterials" />

        <Separator />

        <CategoryWrapper>
          <Checkbox name="products_tents">
            {t('signup.products.tents')}
          </Checkbox>
        </CategoryWrapper>
        <Tents resourceType="tents" />

        <Separator />

        <CategoryWrapper>
          <Others />
        </CategoryWrapper>
      </div>
    </div>
  )
}

export default SignupProducts;
