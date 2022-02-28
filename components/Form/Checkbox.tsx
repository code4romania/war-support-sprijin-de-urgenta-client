import { FC, InputHTMLAttributes } from "react";
import clsx from "clsx";

const Element: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  name,
  children,
  value,
}) => {
  return (
    <div
      className="flex items-center"
    >
      <input
        type="checkbox"
        name={name}
        id={name}
        value={value}
        className={clsx(
          'appearance-none mr-2',
          'before:content-[" "] before:block',
          'w-4 h-4',
          'border-gray-100 border-2 rounded-sm',
          'checked:border-blue-600 checked:bg-blue-600',
          'checked:bg-checkbox-selected bg-center bg-no-repeat',
        )}
      />
      <label
        htmlFor={name}
        className={clsx(
          'text-sm'
        )}
      >
        {children}
      </label>
    </div>
  );
}

export default Element;
