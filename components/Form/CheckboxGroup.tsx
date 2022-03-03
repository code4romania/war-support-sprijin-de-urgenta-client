import { ElementWrapper } from "@/components/Form/common";
import { FC } from "react";
import { GroupElementProps } from "./types";

const CheckboxGroup: FC<GroupElementProps> = ({
  children,
  errors,
  label,
}) => {
  return (
    <ElementWrapper hasError={!!errors}>
      {label && (
        <h3 className="mb-4 block text-base font-semibold text-gray-700">
          {label}
        </h3>
      )}
      {children}
      {Array.isArray(errors)
        ? errors.map((e, index) => <p key={index} className="text-sm pl-1 pr-1 text-red-50">{e.message}</p>)
        : <p className="text-sm pl-1 pr-1 text-red-50">{errors?.message}</p>}
    </ElementWrapper>
  )
}

export default CheckboxGroup
