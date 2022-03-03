import Location from "@/components/SignUpProducts/common/Location";
import { FC } from "react";
import Quantity from "@/components/SignUpProducts/common/Quantity";
import Product from "@/components/SignUpProducts/common/Product";
import { ResourceType } from "@/components/SignUpProducts/types";
import ProductTypeWrapper from "@/components/SignUpProducts/common/ProductTypeWrapper";


interface IProps {
  resourceType: ResourceType;
}

const BuildingMaterials: FC<IProps> = ({
  resourceType
}) => {
  return (
    <ProductTypeWrapper>
      <Product resourceType={resourceType}/>

      <Quantity resourceType={resourceType}/>

      <Location resourceType={resourceType} counties={[]} cities={[]}/>
    </ProductTypeWrapper>
  )
}
export default BuildingMaterials;
