import Input from "@/components/Form/Input";
import Dropdown from "@/components/Form/Dropdown";
import Location from "@/components/SignupProducts/common/Location";
import { FC } from "react";
import Quantity from "@/components/SignupProducts/common/Quantity";
import Product from "@/components/SignupProducts/common/Product";

const BuildingMaterials: FC = () => {
  return (
    <div>
      <Product />
      <Quantity />

      <Location />
    </div>
  )
}
export default BuildingMaterials;
