import { forwardRef } from 'react'
import clsx from 'clsx'
import { ElementWrapper, Label } from '@/components/Form/common'
import { DropdownElementProps } from '@/components/Form/types'

/**
 * Use as a regular <select> tag, pass <option> elements as children
 *
 * <Dropdown
 *  name="userType"
 *  label="Tip utilizator"
 * >
 *  <option value="typeA">Type A</option>
 *  <option value="typeB">Type B</option>
 *</Dropdown>
 */

// eslint-disable-next-line react/display-name
const Dropdown = forwardRef<HTMLSelectElement, DropdownElementProps>(
  ({ name, errors, label, noValidations, children, placeholder, ...rest }, ref) => {
    return (
      <ElementWrapper hasError={!!errors} noValidations={noValidations}>
        {label && (
          <Label name={name} hasError={!!errors}>
            {label}
          </Label>
        )}

        <div className="relative flex">
          <select
            name={name}
            ref={ref}
            className={clsx(
              'block w-full h-10 mt-1',
              'border border-gray-200 rounded-md',
              'px-2 py-1.5',
              { 'border-red-50 border-2': errors }
            )}
            defaultValue={label}
            {...rest}
          >
            <option hidden disabled>
              {placeholder}
            </option>
            {children}
          </select>
        </div>

        {errors && (
          <p className="pl-1 pr-1 text-sm text-red-50">{errors.message}</p>
        )}
      </ElementWrapper>
    )
  }
)

export default Dropdown
