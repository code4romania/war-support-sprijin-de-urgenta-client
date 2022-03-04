import clsx from 'clsx'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { MultiSelect } from 'react-multi-select-component'
import { Label } from './common'
import { DropdownMultiSelectProps } from './types'

const DropdownMultiSelect = ({
  options,
  disabled,
  label,
  hideLabel = false,
  name,
  className,
  control,
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
    return `${selected.length} ${t('controls.counties.selected')}`
  }

  return (
    <div className={clsx(className)}>
      {children}
      {label && !hideLabel && (
        <Label name={name} hasError={!!errors}>
          {label}
        </Label>
      )}
      <div className={'flex flex-col mt-1'}>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange } }) => (
            <div>
              <MultiSelect
                options={options}
                value={selected}
                onChange={(props: any) => {
                  onChange(props.map((p: any) => p.value))
                  setSelected(props)
                }}
                labelledBy={clsx('labelledBy', 'Code 4 Romania')}
                disabled={disabled}
                hasSelectAll={false}
                valueRenderer={valueRenderer}
                className="min-w-[190px]"
              />
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
          )}
        />
      </div>
    </div>
  )
}
export default DropdownMultiSelect
