import { ResourceType } from "@/components/SignupProducts/types";
import { FC } from "react";
import Location from "@/components/SignupProducts/common/Location";
import Input from "@/components/Form/Input";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/Form/common";

interface IProps {
  resourceType: ResourceType;
}

const Tents: FC<IProps> = ({
  resourceType
}) => {
  const { t } = useTranslation();
  return (
    <div>
      <Input
        type="number"
        label={t('signup.products.qty')}
        labelPosition="horizontal"
      />
      <div className="flex">
        <Input
          type="number"
          label={t('signup.products.capacity')}
          labelPosition="horizontal"
        />
        <Label className={"ml-3 mt-3"}>
          {t('signup.products.persons')}
        </Label>
      </div>
      <Location resourceType="tents"/>
    </div>
  )
}

export default Tents;
