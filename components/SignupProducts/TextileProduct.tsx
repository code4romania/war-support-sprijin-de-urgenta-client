import { FC } from "react";
import Checkbox from "@/components/Form/Checkbox";
import { useTranslation } from "react-i18next";
import Input from "@/components/Form/Input";
import Textarea from "@/components/Form/Textarea";
import Location from "@/components/SignupProducts/common/Location";
import clsx from "clsx";
import Quantity from "@/components/SignupProducts/common/Quantity";
import { ResourceType } from "@/components/SignupProducts/types";

interface IProps {
  resourceType: ResourceType;
}

const TextileProduct: FC<IProps> = ({
  resourceType
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <Checkbox
        name={`products_${resourceType}_clothing`}
      >
        {t('signup.products.clothing')}
      </Checkbox>
      <div className={clsx('ml-5 grid grid-cols-2')}>
        <Checkbox
          name={`products_${resourceType}_female`}
        >
          {t('signup.products.female')}
        </Checkbox>
        <Checkbox
          name={`products_${resourceType}_male`}
        >
          {t('signup.products.male')}
        </Checkbox>
        <Checkbox
          name={`products_${resourceType}_children`}
        >
          {t('signup.products.children')}
        </Checkbox>
        <Input
          name={`products_${resourceType}_children_age`}
          label={t('signup.products.children.age')}
          labelPosition="horizontal"
        />
      </div>

      <Checkbox
        name={`products_${resourceType}_blankets`}
      >
        {t('signup.products.blankets')}
      </Checkbox>

      <Checkbox
        name={`products_${resourceType}_sheets`}
      >
        {t('signup.products.sheets')}
      </Checkbox>

      <Checkbox
        name={`products_${resourceType}_sleepingBags`}
      >
        {t('signup.products.sleepingBags')}
      </Checkbox>

      <div>
        <Checkbox
          name={`products_${resourceType}_others`}
        >
          {t('signup.products.others')}
        </Checkbox>
        <div className="ml-5">
          <Textarea name={`products_${resourceType}_others_content`}/>
        </div>
      </div>

      <Quantity resourceType="textile" />

      <Location resourceType="textile" counties={[]} cities={[]} />
    </div>
  )
}

export default TextileProduct;
