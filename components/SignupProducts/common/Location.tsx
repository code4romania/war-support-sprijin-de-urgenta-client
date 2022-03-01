import Dropdown from "@/components/Form/Dropdown";
import { FC } from "react";
import { City, County, ResourceType } from "@/components/SignupProducts/types";
import clsx from "clsx";
import { Label } from "@/components/Form/common";
import { useTranslation } from "react-i18next";

interface IProps {
  resourceType: ResourceType;
  counties: County[];
  cities: City[];
}

const Location: FC<IProps> = ({
  resourceType,
  counties = [],
  cities = [],
}) => {
  const { t } = useTranslation();

  return (
    <div className={clsx('flex justify-start')}>
      <Label className={"mr-5 pt-3"}>
        {t('signup.products.location')}
      </Label>
      <Dropdown
        label={t('signup.products.county')}
        className={"mr-5"}
        hideLabel
      >
        {counties.map(county => <option key={county}>{county}</option>)}
      </Dropdown>

      <Dropdown
        label={t('signup.products.city')}
        hideLabel
      >
        {cities.map(city => <option key={city}>{city}</option>)}
      </Dropdown>
    </div>
  )
}

export default Location;
