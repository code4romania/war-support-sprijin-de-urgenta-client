import { FC } from 'react'
import { ElementWrapper, Required } from '@/components/Form/common'
import { GroupElementProps } from '@/components/Form/types'
import { ErrorLabel } from './ErrorLabel'

const RadioGroup: FC<GroupElementProps> = ({ children, errors, label, required }) => {
  return (
    <ElementWrapper hasError={!!errors}>
      {label && (
        <h3 className="block mb-4 text-base font-semibold text-gray-700">
          {label}{required && <Required /> }
        </h3>
      )}
      {children}
      <ErrorLabel errors={errors} />
    </ElementWrapper>
  )
}

export default RadioGroup
