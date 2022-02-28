import {forwardRef, InputHTMLAttributes} from "react";
import {ErrorOption} from "react-hook-form";
import clsx from "clsx";

interface IProps extends InputHTMLAttributes<HTMLInputElement>{
  name: string;
  label?: string;
  errors?: ErrorOption;
}

const Element = forwardRef<HTMLInputElement, IProps>(({
  name,
  label,
  errors,
  value,
  ...rest
}, ref) => {
  return (
    <div
      className={clsx("mb4", {'pb-5': !errors })}
    >
      {label && (
        <label
          className={clsx('block text-base font-semibold text-gray-700')}
          htmlFor={name}
        >
          {label}
        </label>
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
          'border border-gray-100 rounded-md',
          'focus:ring-blue-600 focus:border-blue-600 focus:border-2 focus:outline-none',
          {'border-red-50 border-2': errors }
        )}
        {...rest}
      />
    </div>
  );
});

Element.displayName = 'Number';

export default Element;
