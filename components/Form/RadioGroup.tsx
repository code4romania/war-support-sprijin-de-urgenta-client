import { FC } from 'react'
import { ElementWrapper } from '@/components/Form/common'
import { GroupElementProps } from '@/components/Form/types'
import { ErrorLabel } from './ErrorLabel'

const RadioGroup: FC<GroupElementProps> = ({ children, errors, label }) => {
  return (
    <ElementWrapper hasError={!!errors}>
      {label && (
        <h3 className="mb-4 block text-base font-semibold text-gray-700">
          {label}
        </h3>
      )}
      {children}
      <ErrorLabel errors={errors} />
    </ElementWrapper>
  )
}

export default RadioGroup
