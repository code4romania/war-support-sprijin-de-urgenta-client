import clsx from 'clsx'
import { forwardRef } from 'react'
import { InputElementProps } from '@/components/Form/types'

const Element = forwardRef<HTMLInputElement, InputElementProps>(
  ({ name, children, value, className, errors, ...rest }, ref) => {
    return (
      <div className={clsx('flex items-center mb-4', className)}>
        <input
          type="radio"
          name={name}
          id={`${name}_${value}`}
          value={value}
          ref={ref}
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
          {children}
        </label>
        {Array.isArray(errors) ? (
          errors.map((e, index) => (
            <p
              key={index}
              className="absolute text-sm pl-1 pr-1 text-red-50"
            >
              {e.message}
            </p>
          ))
        ) : (
          <p className="absolute text-sm pl-1 pr-1 text-red-50">
            {errors?.message}
          </p>
        )}
      </div>
    )
  }
)

Element.displayName = 'Radio'

export default Element
