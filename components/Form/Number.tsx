import { forwardRef } from "react";
import clsx from "clsx";
import { ElementWrapper, Label } from "@/components/Form/common";
import { InputElementProps } from "@/components/Form/types";
import { ErrorLabel } from "./ErrorLabel";

const Element = forwardRef<HTMLInputElement, InputElementProps>(({
  name,
  label,
  errors,
  value,
  ...rest
}, ref) => {
  return (
    <ElementWrapper hasError={!!errors}>
      {label && (
        <Label name={name} hasError={!!errors}>
          {label}
        </Label>
      )}

      <input
        type="number"
        name={name}
        id={name}
        value={value}
        ref={ref}
        className={clsx(
          'block w-full h-10 mt-1',
          'px-3 py-2',
          'border border-gray-200 rounded-md',
          'focus:ring-blue-600 focus:border-blue-600 focus:border-2 focus:outline-none',
          { 'border-red-50 border-2': errors }
        )}
        {...rest}
      />

      <ErrorLabel errors={errors} />
    </ElementWrapper>
  );
});

Element.displayName = 'Number';

export default Element;
