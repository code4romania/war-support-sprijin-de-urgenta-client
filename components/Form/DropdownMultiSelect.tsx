import clsx from 'clsx'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { MultiSelect } from 'react-multi-select-component'
import { Label, Required } from './common'
import { ErrorLabel } from './ErrorLabel'
import { DropdownMultiSelectProps } from './types'

const Component = React.forwardRef<
  HTMLInputElement,
  React.PropsWithChildren<DropdownMultiSelectProps>
>(
  (
    {
      options,
      disabled,
      label,
      hideLabel = false,
      name,
      className,
      control,
      errors,
      required,
      children,
      labelPosition
    },
    ref
  ) => {
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
        <div className={clsx({
          'flex flex-row items-center horizontal-label': labelPosition === 'horizontal',
        })}>
          {label && !hideLabel && (
            <Label
              name={name}
              hasError={!!errors}
              className={clsx({ 'flex-[1_0_50%]': labelPosition === 'horizontal' })}
            >
              {label}{required && <Required /> }
            </Label>
          )}
          <div ref={ref} className={'flex flex-[1_0_50%] flex-col mt-1'}>
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
                    valueRenderer={valueRenderer}
                  />
                </div>
              )}
            />
          </div>
        </div>
        <ErrorLabel errors={errors} />
      </div>
    )
  }
)
Component.displayName = 'DropdownMultiSelect'
export default Component
