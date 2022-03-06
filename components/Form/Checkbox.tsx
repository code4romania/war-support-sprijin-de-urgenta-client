import { forwardRef } from 'react'
import clsx from 'clsx'
import { InputElementProps } from '@/components/Form/types'
import { ErrorLabel } from './ErrorLabel'

const Element = forwardRef<HTMLInputElement, InputElementProps>(
  ({ name, children, value, checked, className, errors, ...rest }, ref) => {
    return (
      <div className={clsx('flex flex-col mb-4', className)}>
        <div className={clsx('flex items-center')}>
          <input
            type="checkbox"
            name={name}
            id={`${name}_${value}`}
            value={value}
            ref={ref}
            checked={checked}
            className={clsx(
              'appearance-none mr-2 bg-white',
              'before:content-[" "] before:block',
              'w-4 h-4',
              'cursor-pointer',
              'border-gray-200 border-2 rounded-sm',
              'checked:border-blue-600 checked:bg-blue-600',
              'checked:bg-checkbox-selected bg-center bg-no-repeat'
            )}
            {...rest}
          />
          <label htmlFor={`${name}_${value}`} className="text-sm cursor-pointer">
            {children}
          </label>
        </div>
        <ErrorLabel errors={errors} />
      </div>
    )
  }
)

Element.displayName = 'Checkbox'

export default Element
