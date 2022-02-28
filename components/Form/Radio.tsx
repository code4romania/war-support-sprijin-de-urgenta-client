import clsx from "clsx";
import { forwardRef, InputHTMLAttributes } from "react";
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
  errors,
  ...rest
}, ref) => {
  return (
    <div
      className={clsx("flex items-center mb-4", className)}
    >
      <input
        type="radio"
        name={name}
        id={`${name}_${value}`}
        value={value}
        ref={ref}
        className={clsx(
          'appearance-none mr-2',
          'w-4 h-4',
          'before:content-[" "] before:block',
          'border-gray-100 border-2 rounded-lg',
          'checked:border-blue-600 checked:bg-blue-600',
          'checked:bg-radio-selected bg-center bg-no-repeat'
        )}
        {...rest}
      />
      <label htmlFor={`${name}_${value}`} className={clsx('text-sm')}>
        {children}
      </label>
      {errors && <p className="text-sm pl-1 pr-1 text-red-50">{errors.message}</p>}
    </div>
  );
});

Element.displayName = 'Radio'

export default Element
