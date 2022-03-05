import { FC } from "react";

const ProductTypeWrapper:FC = ({ children }) => {
  return (
    <div className="ml-5">
      {children}
    </div>
  )
}

export default ProductTypeWrapper;
