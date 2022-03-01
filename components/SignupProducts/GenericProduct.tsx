import Input from "@/components/Form/Input";
import Dropdown from "@/components/Form/Dropdown";
import { useTranslation } from "react-i18next";
import Location from "@/components/SignupProducts/common/Location";
import Quantity from "@/components/SignupProducts/common/Quantity";
import Product from "@/components/SignupProducts/common/Product";
import { FC } from "react";
import { ResourceType } from "@/components/SignupProducts/types";
import ExpireDate from "@/components/SignupProducts/common/ExpireDate";

interface IProps {
  resourceType: ResourceType;
}
const GenericProduct: FC<IProps> = ({
  resourceType,
}) => {

  return (
    <div>
      <Product resourceType={resourceType} />

      <Quantity resourceType={resourceType} />

      <ExpireDate resourceType={resourceType} />

      <Location />
    </div>
  )
}

export default GenericProduct;
