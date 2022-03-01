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

const SignupProducts: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={clsx('bg-blue-100 bg-opacity-50 rounded-md p-4')}>
      <h2>{t('signup.products.header')}</h2>

      <div>
        {/*<Checkbox*/}
        {/*  name="products_food"*/}
        {/*>*/}
        {/*  {t('signup.products.food')}*/}
        {/*</Checkbox>*/}
        {/*<GenericProduct resourceType="food" />*/}

        {/*<Separator />*/}

        {/*<Checkbox name="products_food">*/}
        {/*  {t('signup.products.generalHygiene')}*/}
        {/*</Checkbox>*/}
        {/*<GenericProduct resourceType="generalHygiene" />*/}

        {/*<Separator />*/}

        {/*<Checkbox name="products_food">*/}
        {/*  {t('signup.products.feminineHygiene')}*/}
        {/*</Checkbox>*/}
        {/*<GenericProduct resourceType="feminineHygiene" />*/}

        {/*<Separator />*/}

        <Checkbox>
          {t('signup.products.textile')}
        </Checkbox>
        <TextileProduct resourceType="textile" />

        {/*<Separator />*/}

        {/*<Checkbox>*/}
        {/*  {t('signup.products.buildingMaterials')}*/}
        {/*</Checkbox>*/}
        {/*<BuildingMaterials resourceType="buildingMaterials" />*/}

        {/*<Separator />*/}

        {/*<Checkbox>*/}
        {/*  {t('signup.products.tents')}*/}
        {/*</Checkbox>*/}
        {/*<Tents resourceType="tents" />*/}

        {/*<Separator />*/}

        {/*<Others />*/}
      </div>
    </div>
  )
}

export default SignupProducts;
