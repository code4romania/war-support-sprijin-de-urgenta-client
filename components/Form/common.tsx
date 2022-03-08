import clsx from 'clsx'
import { FC } from 'react'

interface IElementWrapperProps {
  hasError?: boolean
  className?: string
  noValidations?: boolean
}

export const ElementWrapper: FC<IElementWrapperProps> = ({
  hasError,
  children,
  noValidations,
  className,
}) => {
  return (
    <div className={clsx({ 'pb-5': !hasError && !noValidations }, className)}>
      {children}
    </div>
  )
}

interface ILabelWrapperProps {
  name?: string
  className?: string
}

export const Label: FC<ILabelWrapperProps> = ({
  children,
  name,
  className,
}) => {
  return (
    <label
      className={clsx('block text-base font-semibold text-gray-700', className)}
      htmlFor={name}
    >
      {children}
    </label>
  )
}

export const Required = ({}) => {
  return <span className={clsx('text-red-50 font-semibold')}> *</span>
}
