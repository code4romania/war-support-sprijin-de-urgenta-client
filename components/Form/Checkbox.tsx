import { FC, forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";
import { ErrorOption } from "react-hook-form";
interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  errors?: ErrorOption;
}

const Element = forwardRef<HTMLInputElement, IProps>(({
  name,
  children,
  value,
  className,
  ...rest
}, ref) => {
  return (
    <div
      className={clsx("flex items-center mb-4", className)}
    >
      <input
        type="checkbox"
        name={name}
        id={`${name}_${value}`}
        value={value}
        ref={ref}
        className={clsx(
          'appearance-none mr-2',
          'before:content-[" "] before:block',
          'w-4 h-4',
          'border-gray-100 border-2 rounded-sm',
          'checked:border-blue-600 checked:bg-blue-600',
          'checked:bg-checkbox-selected bg-center bg-no-repeat',
        )}
        {...rest}
      />
      <label
        htmlFor={`${name}_${value}`}
        className={clsx(
          'text-sm'
        )}
      >
        {children}
      </label>
    </div>
  );
});

Element.displayName = 'Checkbox';

export default Element;
