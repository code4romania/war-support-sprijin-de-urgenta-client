import clsx from 'clsx'
import { forwardRef } from 'react'
import { InputElementProps } from '@/components/Form/types'
import { ErrorLabel } from './ErrorLabel'
import { Required } from './common'

const Element = forwardRef<HTMLInputElement, InputElementProps>(
  ({ name, children, value, required, className, errors, ...rest }, ref) => {
    return (
      <div className={clsx('flex items-center mb-4', className)}>
        <input
          type="radio"
          name={name}
          id={`${name}_${value}`}
          value={value}
          ref={ref}
          required={required}
          className={clsx(
            'appearance-none mr-2',
            'cursor-pointer',
            'w-4 h-4',
            'before:content-[" "] before:block',
            'border-gray-200 border-2 rounded-lg',
            'checked:border-blue-600 checked:bg-blue-600',
            'checked:bg-radio-selected bg-center bg-no-repeat'
          )}
          {...rest}
        />
        <label htmlFor={`${name}_${value}`} className="text-sm cursor-pointer">
          {children} {required && <Required /> }
        </label>
        <ErrorLabel errors={errors} />
      </div>
    )
  }
)

Element.displayName = 'Radio'

export default Element
