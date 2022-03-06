import clsx from "clsx";
import { forwardRef } from "react";
import { ElementWrapper, Label, Required } from "@/components/Form/common";
import { TextareaElementProps } from "@/components/Form/types";

const Element = forwardRef<HTMLTextAreaElement, TextareaElementProps>(({
    name,
    label,
    errors,
    required,
    rows = 3,
    className,
    ...rest
  }, ref) => {
    return (
      <ElementWrapper hasError={!!errors} className={className}>
        {label && (
          <Label name={name} hasError={!!errors}>
            {label}{required && <Required /> }
          </Label>
        )}
        <textarea
          name={name}
          id={name}
          rows={rows}
          required={required}
          className={clsx(
            'block w-full mt-1',
            'px-3 py-2',
            'border border-gray-200 rounded-md',
            'focus:ring-blue-600 focus:border-blue-600 focus:border-2 focus:outline-none',
            'resize-none',
            {'border-red-50 border-2': errors},
          )}
          ref={ref}
          {...rest}
        />

        {errors && <p className="pl-1 pr-1 text-sm text-red-50">{errors.message}</p>}
      </ElementWrapper>
    )
  }
);

Element.displayName = 'Textarea';

export default Element;
