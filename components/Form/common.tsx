import clsx from "clsx";
import {FC} from "react";

interface IElementWrapperProps {
  hasError?: boolean;
}

export const ElementWrapper: FC<IElementWrapperProps> = ({
  hasError,
  children
}) => {
  return (
    <div
      className={clsx("mb4", {'pb-5': !hasError })}
    >
      {children}
    </div>
  )
}

interface ILabelWrapperProps {
  name: string;
  hasError?: boolean;
}

export const Label: FC<ILabelWrapperProps> = ({
  hasError,
  children,
  name,
}) => {
  return (
    <label
      className={clsx(
        'block text-base font-semibold text-gray-700',
        {'text-red-50': hasError}
      )}
      htmlFor={name}
    >
      {children}
    </label>
  )
}
