import { forwardRef, InputHTMLAttributes } from "react";
import { ErrorOption } from "react-hook-form";
import clsx from "clsx";

interface IProps extends InputHTMLAttributes<HTMLSelectElement>{
  name: string;
  label?: string;
  errors?: ErrorOption;
}

/**
 * Use as a regular <select> tag, pass <option> elements as children
 *
 * <Dropdown
 *  name="userType"
 *  label="Tip utilizator"
 * >
 *  <option value="typeA">Type A</option>
 *  <option value="typeB">Type B</option>
 *</Dropdown>
 */

// eslint-disable-next-line react/display-name
const Dropdown = forwardRef<HTMLSelectElement, IProps>(({
  name,
  errors,
  label,
  children,
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

      <div className="flex relative">
        <select
          name={name}
          ref={ref}
          className={clsx(
            'block w-full h-10 mt-1',
            'border border-gray-100 rounded-md',
            'px-2 py-1.5'
          )}
          {...rest}
        >
          {children}
        </select>
      </div>
    </div>
  )
});

export default Dropdown;
