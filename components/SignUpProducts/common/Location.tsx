import { Label } from '@/components/Form/common'
import DropdownMultiSelect from '@/components/Form/DropdownMultiSelect'
import Input from '@/components/Form/Input'
import { MultiSelectOption, PartialRecord } from '@/components/Form/types'
import { ResourceType } from '@/components/SignUpProducts/types'
import clsx from 'clsx'
import { Control, ErrorOption, Path, UseFormRegister } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type RecordKey = 'county_coverage' | 'town';

interface IProps<TFormValues> {
  counties?: MultiSelectOption[]
  control: Control<TFormValues, any>
  register: UseFormRegister<TFormValues>
  errors?: PartialRecord<Path<TFormValues>, ErrorOption | ErrorOption[]>
  names: Record<RecordKey, Path<TFormValues>>
}

const Location = <TFormValues extends PartialRecord<RecordKey, unknown>>({
  counties = [],
  control,
  register,
  errors,
  names
}: IProps<TFormValues>) => {
  const { t } = useTranslation()

  return (
    <>
      <div className={clsx('flex flex-row')}>
        <Label className={'pt-3 flex-1'}>{t('signup.products.county')}</Label>
        <DropdownMultiSelect
          {...register && register(names.county_coverage)}
          className={clsx('w-1/2 mb-4')}
          options={counties || []}
          errors={errors && errors[names.county_coverage]}
          control={control}
        />
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

export default Location
