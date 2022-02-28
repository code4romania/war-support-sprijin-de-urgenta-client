import clsx from "clsx";
import { forwardRef, TextareaHTMLAttributes } from "react";
import { ErrorOption } from "react-hook-form";
import {ElementWrapper, Label} from "@/components/Form/common";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  errors?: ErrorOption;
}

const Element = forwardRef<HTMLTextAreaElement, IProps>(({
  name,
  label,
  errors,
  rows = 3,
  ...rest
}, ref) => {
    return (
      <ElementWrapper hasError={!!errors}>
        {label && (
          <Label name={name} hasError={!!errors}>
            {label}
          </Label>
        )}
        <textarea
          name={name}
          id={name}
          rows={rows}
          className={clsx(
            'block w-full mt-1',
            'px-3 py-2',
            'border border-gray-100 rounded-md',
            'focus:ring-blue-600 focus:border-blue-600 focus:border-2 focus:outline-none',
            {'border-red-50 border-2': errors }
          )}
          ref={ref}
          {...rest}
        />

        {errors && <p className="text-sm pl-1 pr-1 text-red-50">{errors.message}</p>}
      </ElementWrapper>
    )
  }
);

Element.displayName = 'Textarea';

export default Element;
