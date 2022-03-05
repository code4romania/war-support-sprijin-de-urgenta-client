import clsx from "clsx";
import { ErrorOption } from "react-hook-form"

interface IErrorLabelProps {
  errors?: ErrorOption | ErrorOption[]
  className?: string;
}

export const ErrorLabel = ({ errors, className }: IErrorLabelProps) => {
  return (
    <>
      {Array.isArray(errors) ? (
        errors.map((e, index) => (
          <p
            key={index}
            className={clsx("absolute text-sm pl-1 pr-1 text-red-50", className)}
          >
            {e.message}
          </p>
        ))
      ) : (
        <p className={clsx("absolute text-sm pl-1 pr-1 text-red-50", className)}>
          {errors?.message}
        </p>
      )}
    </>
  )
}