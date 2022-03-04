import clsx from 'clsx'
import { MultiSelect } from 'react-multi-select-component'
import { useState } from 'react'
import { DropdownMultiSelectProps, MultiSelectOption } from './types'
import { Label } from './common'
import { useTranslation } from 'react-i18next'

const DropdownMultiSelect = ({
  options,
  disabled,
  label,
  hideLabel = false,
  name,
  errors,
  children,
}: DropdownMultiSelectProps) => {
  const [selected, setSelected] = useState([])
  const { t } = useTranslation('common')

  const valueRenderer = (selected: typeof options) => {
    if (!selected.length) {
      return t('services.county.placeholder')
    }

    if (selected.length === 1) return selected[0].label
    // TODO add translation
    return `${selected.length} judete selectate`
  }

  return (
    <div className="flex items-center">
      {children}
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
        valueRenderer={valueRenderer}
        className="min-w-[190px]"
      />
    </div>
  )
}
export default DropdownMultiSelect
