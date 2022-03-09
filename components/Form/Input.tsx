import { forwardRef } from "react";
import clsx from "clsx";
import { ElementWrapper, Label, Required } from "@/components/Form/common";
import { InputElementProps } from "@/components/Form/types";
import { ErrorLabel } from "./ErrorLabel";

interface IProps extends InputElementProps {
  labelPosition?: 'horizontal' | 'vertical';
}

const Element = forwardRef<HTMLInputElement, IProps>(({
  label,
  labelPosition,
  value,
  name,
  type = 'text',
  required,
  errors,
  className,
  ...rest
}, ref) => {

  return (
    <ElementWrapper hasError={!!errors} className={clsx(className)}>
      <div className={clsx({
        'flex flex-row items-center horizontal-label': labelPosition === 'horizontal',
      })}>
        {label && (
          <Label
            name={name}
            className={clsx({ 'flex-[1_0_50%]': labelPosition === 'horizontal' })}
          >
            {label} {required && <Required /> }
          </Label>
        )}

        <input
          type={type}
          name={name}
          id={name}
          value={value}
          ref={ref}
          required={required}
          className={clsx(
            'block w-full h-10 mt-1',
            'px-3 py-2',
            'border border-gray-200 rounded-md',
            'focus:ring-blue-600 focus:border-blue-600 focus:border-2 focus:outline-none',
            { 'flex-[1_0_50%]': labelPosition === 'horizontal' },
            { 'border-red-50 border-2': errors }
          )}
          {...rest}
        />
      </div>
      <ErrorLabel errors={errors} />
    </ElementWrapper>
  );
});

Element.displayName = 'Input';

export default Element;
