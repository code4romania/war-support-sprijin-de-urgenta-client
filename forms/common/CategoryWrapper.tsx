import { FC } from "react";

const CategoryWrapper: FC = ({ children }) => {
  return (
    <div className={"my-5"}>
      {children}
    </div>
  )
}

export default CategoryWrapper;
