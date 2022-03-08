import { forwardRef } from 'react'
import clsx from 'clsx'
import { ElementWrapper, Label, Required } from '@/components/Form/common'
import { InputElementProps } from '@/components/Form/types'
import { ErrorLabel } from './ErrorLabel'

const Element = forwardRef<HTMLInputElement, InputElementProps>(
  ({ label, name, errors, value, helpText, required, ...rest }, ref) => {
    return (
      <ElementWrapper hasError={!!errors}>
        {label && (
          <Label name={name}>
            {label} {required && <Required />}
          </Label>
        )}

        {helpText}

        <input
          name={name}
          id={name}
          value={value}
          type="date"
          ref={ref}
          required={required}
          className={clsx(
            'block w-full h-10 mt-1',
            'px-3 py-2',
            'border border-gray-200 rounded-md',
            'focus:ring-blue-600 focus:border-blue-600 focus:border-2 focus:outline-none',
            '[appearance:textfield]',
            { 'border-red-50 border-2': errors }
          )}
          {...rest}
        />

        <ErrorLabel errors={errors} />
      </ElementWrapper>
    )
  }
)

Element.displayName = 'Date'

export default Element
