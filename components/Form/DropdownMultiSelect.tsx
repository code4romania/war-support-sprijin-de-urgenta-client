import clsx from 'clsx'
import { MultiSelect } from 'react-multi-select-component'
import { useState } from 'react'
import { DropdownMultiSelectProps, MultiSelectOption } from './types'
import { Label } from './common'

const filterOptions =
  (aOptions: MultiSelectOption[]) =>
  (options = aOptions, filter: string | RegExp) => {
    if (!filter) {
      return options
    }
    const re = new RegExp(filter, 'g')
    return options.filter(({ value }) => value && value.match(re))
  }

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
        filterOptions={filterOptions(options)}
        labelledBy={clsx('labelledBy', 'Code 4 Romania')}
        disabled={disabled}
      />
    </div>
  )
}
export default DropdownMultiSelect
