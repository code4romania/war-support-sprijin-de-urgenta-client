import clsx from 'clsx'
import { MultiSelect } from 'react-multi-select-component'
import { useState } from 'react'
import { DropdownMultiSelectProps, MultiSelectOption } from './types'
import { Label } from './common'

const DropdownMultiSelect = ({
  options,
  disabled,
  label,
  hideLabel = false,
  name,
  errors,
}: DropdownMultiSelectProps) => {
  const [selected, setSelected] = useState([])
  console.log(options)
  return (
    <div>
      {label && !hideLabel && (
        <Label name={name} hasError={!!errors}>
          {label}
        </Label>
      )}
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy={clsx('labelledBy', 'Code 4 Romania')}
        disabled={disabled}
        hasSelectAll={false}
      />
    </div>
  )
}
export default DropdownMultiSelect
