import { FC } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import Checkbox from "@/components/Form/Checkbox";
import GenericProduct from "@/components/SignupProducts/GenericProduct";
import TextileProduct from "@/components/SignupProducts/TextileProduct";
import BuildingMaterials from "@/components/SignupProducts/BuildingMaterials";
import Separator from "@/components/SignupProducts/Separator";

const SignupProducts: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={clsx('bg-blue-100 bg-opacity-50 rounded-md p-4')}>
      <h2>{t('signup.products.header')}</h2>

      <div>
        <Checkbox name="products_food">
          {t('signup.products.food')}
        </Checkbox>
        <GenericProduct />

        <Separator />

        <Checkbox name="products_food">
          {t('signup.products.generalHygiene')}
        </Checkbox>
        <GenericProduct />

        <Separator />

        <Checkbox name="products_food">
          {t('signup.products.feminineHygiene')}
        </Checkbox>
        <GenericProduct />

        <Separator />

        <Checkbox>
          Imbracaminte si alte textile
        </Checkbox>
        <TextileProduct />

        <Separator />

        <Checkbox>
          Materiale de constructii
        </Checkbox>
        <BuildingMaterials />

        <Separator />

        <Checkbox>
          Corturi
        </Checkbox>
        <BuildingMaterials />
      </div>
    </div>
  )
}

export default SignupProducts;
