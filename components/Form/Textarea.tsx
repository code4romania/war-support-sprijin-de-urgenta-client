import clsx from "clsx";
import {forwardRef, InputHTMLAttributes} from "react";
import {ErrorOption} from "react-hook-form";

interface IProps extends InputHTMLAttributes<HTMLInputElement>{
  name: string;
  label?: string;
  errors?: ErrorOption;
}

// eslint-disable-next-line react/display-name
const Textarea = forwardRef<HTMLTextAreaElement, IProps>(({
  name,
  label,
  errors,
}, ref) => {
    return (
      <div className={clsx('mb4')}>
        <label
          className={clsx('block text-base font-semibold text-gray-700')}
          htmlFor={name}
        >
          {label}
        </label>
      <textarea
        name={name}
        className={clsx(
          'block w-full h-10 mt-1',
          'px-3 py-2',
          'border border-gray-100 rounded-md',
          'focus:ring-blue-600 focus:border-blue-600 focus:border-2 focus:outline-none',
          {'border-red-50 border-2': errors }
        )}
        ref={ref}
      />
      </div>
    )
  }
);

export default Textarea;
