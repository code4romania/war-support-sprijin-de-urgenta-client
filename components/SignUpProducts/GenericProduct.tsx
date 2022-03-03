import Location from "@/components/SignUpProducts/common/Location";
import Quantity from "@/components/SignUpProducts/common/Quantity";
import Product from "@/components/SignUpProducts/common/Product";
import { FC } from "react";
import { ResourceType } from "@/components/SignUpProducts/types";
import ExpireDate from "@/components/SignUpProducts/common/ExpireDate";
import ProductTypeWrapper from "@/components/SignUpProducts/common/ProductTypeWrapper";

interface IProps {
  resourceType: ResourceType;
}
const GenericProduct: FC<IProps> = ({
  resourceType,
}) => {

  return (
    <ProductTypeWrapper>
      <Product resourceType={resourceType} />

      <Quantity resourceType={resourceType} />

      <ExpireDate resourceType={resourceType} />

      <Location resourceType={resourceType} counties={[]} cities={[]} />
    </ProductTypeWrapper>
  )
}

export default GenericProduct;
