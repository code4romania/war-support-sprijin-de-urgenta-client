import { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";
import { ErrorOption } from "react-hook-form";

interface IProps extends InputHTMLAttributes<HTMLInputElement>{
  name: string;
  label?: string;
  errors?: ErrorOption;
}

// eslint-disable-next-line react/display-name
const Element = forwardRef<HTMLInputElement, IProps>(({
  label,
  value,
  name,
  type = 'text',
  errors,
  ...rest
}, ref) => {

  return (
    <div className={clsx("mb4", {'pb-5': !errors })}>
      {label && (
        <label
          className={clsx('block text-base font-semibold text-gray-700')}
          htmlFor={name}
        >
          {label}
        </label>
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
          {'border-red-50 border-2': errors }
        )}
        {...rest}
      />
      {errors && <p className="text-sm pl-1 pr-1 text-red-50">{errors.message}</p>}
    </div>
  );
})
export default Element;
