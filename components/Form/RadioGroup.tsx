import {FC, InputHTMLAttributes} from "react";
import {ElementWrapper} from "@/components/Form/common";
import {ErrorOption} from "react-hook-form";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  errors?: ErrorOption;
}

const RadioGroup: FC<IProps> = ({
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

export default RadioGroup;
