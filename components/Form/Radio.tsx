import { FC, InputHTMLAttributes } from "react";
import clsx from "clsx";

const Element: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  name,
  children,
  value,
  ...rest
}) => {
  return (
    <div
      className="flex items-center mb-4"
    >
      <input
        type="radio"
        name={name}
        id={`${name}_${value}`}
        value={value}
        className={clsx(
          'appearance-none mr-2',
          'w-4 h-4',
          'before:content-[" "] before:block',
          'border-gray-100 border-2 rounded-lg',
          'checked:border-blue-600 checked:bg-blue-600',
          'checked:bg-radio-selected bg-center bg-no-repeat',
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
}

Element.displayName = 'Radio';

export default Element;
