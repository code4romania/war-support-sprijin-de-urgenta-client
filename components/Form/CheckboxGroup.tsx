import { FC } from 'react'
import { ElementWrapper } from '@/components/Form/common'
import { InputElementProps } from '@/components/Form/types'

const CheckboxGroup: FC<InputElementProps> = ({ children, errors, label }) => {
  return (
    <ElementWrapper hasError={!!errors}>
      {label && (
        <h3 className="mb-4 block text-base font-semibold text-gray-700">
          {label}
        </h3>
      )}
      {children}
      {errors && (
        <p className="text-sm pl-1 pr-1 text-red-50">{errors.message}</p>
      )}
    </ElementWrapper>
  )
}

export default CheckboxGroup
