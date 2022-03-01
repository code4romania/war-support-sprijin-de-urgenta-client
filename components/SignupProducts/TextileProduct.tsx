import { FC } from "react";
import Checkbox from "@/components/Form/Checkbox";
import { useTranslation } from "react-i18next";
import Input from "@/components/Form/Input";
import Textarea from "@/components/Form/Textarea";
import Location from "@/components/SignupProducts/common/Location";
import clsx from "clsx";
import Quantity from "@/components/SignupProducts/common/Quantity";

const TextileProduct: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Checkbox>
        {t('signup.products.clothing')}
      </Checkbox>
      <div className={clsx('ml-5 grid grid-cols-2')}>
        <Checkbox>
          {t('signup.products.female')}
        </Checkbox>
        <Checkbox>
          {t('signup.products.male')}
        </Checkbox>
        <Checkbox>
          {t('signup.products.children')}
        </Checkbox>
        <Input label={t('signup.products.children.age')} labelPosition="horizontal"/>
      </div>

      <Checkbox>
        {t('signup.products.blankets')}
      </Checkbox>

      <Checkbox>
        {t('signup.products.sheets')}
      </Checkbox>

      <Checkbox>
        {t('signup.products.sleepingBags')}
      </Checkbox>

      <div>
        <Checkbox>
          {t('signup.products.others')}
        </Checkbox>
        <div className="ml-5">
          <Textarea/>
        </div>
      </div>

      <Quantity resourceType="textile" />

      <Location />
    </div>
  )
}

export default TextileProduct;
