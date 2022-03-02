import { forwardRef } from "react";
import clsx from "clsx";
import { ElementWrapper, Label } from "@/components/Form/common";
import { InputElementProps } from "@/components/Form/types";

interface IProps extends InputElementProps {
  labelPosition?: 'horizontal' | 'vertical';
}

const Element = forwardRef<HTMLInputElement, IProps>(({
  label,
  labelPosition,
  value,
  name,
  type = 'text',
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
            hasError={!!errors}
            className={clsx({'flex-1': labelPosition === 'horizontal'})}
          >
            {label}
          </Label>
        )}

        <input
          type={type}
          name={name}
          id={name}
          value={value}
          ref={ref}
          className={clsx(
            'block w-full h-10 mt-1',
            'px-3 py-2',
            'border border-gray-100 rounded-md',
            'focus:ring-blue-600 focus:border-blue-600 focus:border-2 focus:outline-none',
            {'flex-1': labelPosition === 'horizontal'},
            {'border-red-50 border-2': errors}
          )}
          {...rest}
        />
      </div>
      {errors && <p className="pl-1 pr-1 text-sm text-red-50">{errors.message}</p>}
    </ElementWrapper>
  );
});

Element.displayName = 'Input';

export default Element;
