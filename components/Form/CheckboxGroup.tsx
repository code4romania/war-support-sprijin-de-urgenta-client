import { ElementWrapper } from "@/components/Form/common";
import { FC } from "react";
import { ErrorLabel } from "./ErrorLabel";
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
      <ErrorLabel errors={errors} />
    </ElementWrapper>
  )
}

export default CheckboxGroup
