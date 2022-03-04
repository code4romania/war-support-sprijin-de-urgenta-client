import Dropdown from '@/components/Form/Dropdown'
import Input from '@/components/Form/Input'
import { FC } from 'react'
import { City, County, ResourceType } from '@/components/SignUpProducts/types'
import clsx from 'clsx'
import { Label } from '@/components/Form/common'
import { useTranslation } from 'react-i18next'
import DropdownMultiSelect from '@/components/Form/DropdownMultiSelect'
import { useForm } from 'react-hook-form'

interface IProps {
  resourceType: ResourceType
  counties: County[]
  control: any
}

const Location: FC<IProps> = ({
  resourceType,
  counties = [],
  control,
  register,
  errors,
}) => {
  const { t } = useTranslation()

  return (
    <>
      <div className={clsx('flex flex-row')}>
        <Label className={'pt-3 flex-1'}>{t('signup.products.county')}</Label>
        <DropdownMultiSelect
          {...register('county_coverage')}
          className={clsx('w-1/2 mb-4')}
          options={counties || []}
          errors={errors['county_coverage']}
          control={control}
        />
      </div>
      <Input
        name={`products_${resourceType}_town`}
        type="string"
        label={t('signup.products.town')}
        labelPosition="horizontal"
      />
    </>
  )
}

export default Location
