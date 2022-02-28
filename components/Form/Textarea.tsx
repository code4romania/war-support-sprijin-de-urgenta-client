import clsx from "clsx";
import { forwardRef, TextareaHTMLAttributes } from "react";
import { ErrorOption } from "react-hook-form";

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
}, ref) => {
    return (
      <div className={clsx('mb4')}>
        {label && (
          <label
            className={clsx('block text-base font-semibold text-gray-700')}
            htmlFor={name}
          >
            {label}
          </label>
        )}
        <textarea
          name={name}
          rows={rows}
          className={clsx(
            'block w-full mt-1',
            'px-3 py-2',
            'border border-gray-100 rounded-md',
            'focus:ring-blue-600 focus:border-blue-600 focus:border-2 focus:outline-none',
            {'border-red-50 border-2': errors }
          )}
          ref={ref}
        />

        {errors && <p className="text-sm pl-1 pr-1 text-red-50">{errors.message}</p>}
      </div>
    )
  }
);

Element.displayName = 'Textarea';

export default Element;
