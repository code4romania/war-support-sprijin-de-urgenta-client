import { FC } from "react";
import { ElementWrapper } from "@/components/Form/common";
import { InputElementProps } from "@/components/Form/types";

const CheckboxGroup: FC<InputElementProps> = ({
  children,
  errors
}) => {
  return (
    <ElementWrapper hasError={!!errors}>
      {children}
      {errors && <p className="text-sm pl-1 pr-1 text-red-50">{errors.message}</p>}
    </ElementWrapper>
  )
}

export default CheckboxGroup;
