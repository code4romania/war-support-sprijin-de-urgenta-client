import { ResourceType } from '@/components/SignUpProducts/types'
import { FC } from 'react'
import Location from '@/components/SignUpProducts/common/Location'
import Input from '@/components/Form/Input'
import { useTranslation } from 'react-i18next'
import { Label } from '@/components/Form/common'
import ProductTypeWrapper from '@/components/SignUpProducts/common/ProductTypeWrapper'
import { County } from '@/components/SignUpProducts/types'
import { useForm } from 'react-hook-form'

interface IProps {
  resourceType: ResourceType
  counties?: County[]
  category: number
  onSubmit: (values: any) => void
}

const Tents: FC<IProps> = ({ resourceType, counties, category, onSubmit }) => {
  const { t } = useTranslation()
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm()

  const onFormSubmit = (values: any) => {
    onSubmit(values)
  }

  return (
    <ProductTypeWrapper onSubmit={handleSubmit(onFormSubmit)}>
      <Input
        type="number"
        name={`products_${resourceType}_qty`}
        label={t('signup.products.qty')}
        labelPosition="horizontal"
      />
      <div className="flex">
        <Input
          type="number"
          label={t('signup.products.capacity')}
          name={`products_${resourceType}_capacity`}
          labelPosition="horizontal"
        />
        <Label name={t('signup.products.persons')} className={'ml-3 mt-3'}>
          {t('signup.products.persons')}
        </Label>
      </div>
      <Location
        resourceType="tents"
        counties={counties}
        control={control}
        errors={errors}
        register={register}
      />
    </ProductTypeWrapper>
  )
}

export default Tents
