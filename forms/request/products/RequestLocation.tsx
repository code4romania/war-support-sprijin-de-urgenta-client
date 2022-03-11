import DropdownMultiSelect from '@/components/Form/DropdownMultiSelect'
import Input from '@/components/Form/Input'
import { MultiSelectOption, PartialRecord } from '@/components/Form/types'
import clsx from 'clsx'
import { Control, ErrorOption, Path, UseFormRegister } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Dropdown from '@/components/Form/Dropdown'

type RecordKey = 'county_coverage' | 'town'

interface IProps<TFormValues> {
  counties?: MultiSelectOption[]
  control: Control<TFormValues, any>
  register: UseFormRegister<TFormValues>
  errors?: PartialRecord<Path<TFormValues>, ErrorOption | ErrorOption[]>
  names: Record<RecordKey, Path<TFormValues>>
}

const RequestLocation = <TFormValues extends PartialRecord<RecordKey, unknown>>({
  counties = [],
  control,
  register,
  errors,
  names,
}: IProps<TFormValues>) => {
  const { t } = useTranslation()

  return (
    <>
      <div className={clsx('flex flex-row')}>
        <Dropdown
          label={t('signup.other.county_coverage')}
          className={'w-full'}
          errors={errors && errors[names.county_coverage]}
          {...register(names.county_coverage)}
        >
          {counties?.map(
            ({ label, value }: { label: string; value: string }) => {
              return (
                <option key={value} value={value}>
                  {label}
                </option>
              )
            }
          )}
        </Dropdown>
      </div>
      <Input
        type="string"
        label={t('signup.products.town')}
        labelPosition="horizontal"
        errors={errors && errors[names.town]}
        {...register(names.town)}
      />
    </>
  )
}

export default RequestLocation
