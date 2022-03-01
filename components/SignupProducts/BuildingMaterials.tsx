import Location from "@/components/SignupProducts/common/Location";
import { FC } from "react";
import Quantity from "@/components/SignupProducts/common/Quantity";
import Product from "@/components/SignupProducts/common/Product";
import { ResourceType } from "@/components/SignupProducts/types";


interface IProps {
  resourceType: ResourceType;
}

const BuildingMaterials: FC<IProps> = ({
  resourceType
}) => {
  return (
    <div>
      <Product resourceType={resourceType}/>

      <Quantity resourceType={resourceType}/>

      <Location resourceType={resourceType}/>
    </div>
  )
}
export default BuildingMaterials;
