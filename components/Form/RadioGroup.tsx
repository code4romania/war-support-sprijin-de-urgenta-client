import { FC } from 'react'
import { ElementWrapper } from '@/components/Form/common'
import { GroupElementProps } from '@/components/Form/types'

const RadioGroup: FC<GroupElementProps> = ({ children, errors, label }) => {
  return (
    <ElementWrapper hasError={!!errors}>
      {label && (
        <h3 className="mb-4 block text-base font-semibold text-gray-700">
          {label}
        </h3>
      )}
      {children}
      {!Array.isArray(errors) && (
        <p className="text-sm pl-1 pr-1 text-red-50">{errors?.message}</p>
      )}
    </ElementWrapper>
  )
}

export default RadioGroup
