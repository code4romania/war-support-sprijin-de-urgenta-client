import clsx from "clsx";
import {FC} from "react";

interface IElementWrapperProps {
  hasError?: boolean;
  className?: string;
  noValidations?: boolean;
}

export const ElementWrapper: FC<IElementWrapperProps> = ({
  hasError,
  children,
  noValidations,
  className
}) => {
  return (
    <div
      className={clsx({'pb-5': !hasError && !noValidations }, className)}
    >
      {children}
    </div>
  )
}

interface ILabelWrapperProps {
  name?: string;
  hasError?: boolean;
  className?: string;
}

export const Label: FC<ILabelWrapperProps> = ({
  hasError,
  children,
  name,
  className,
}) => {
  return (
    <label
      className={clsx(
        'block text-base font-semibold text-gray-700',
        className,
        {'text-red-50': hasError}
      )}
      htmlFor={name}
    >
      {children}
    </label>
  )
}
