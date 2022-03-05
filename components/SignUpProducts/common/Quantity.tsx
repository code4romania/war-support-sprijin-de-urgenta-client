import Input from '@/components/Form/Input'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ResourceType } from '@/components/SignUpProducts/types'

interface IProps {
  resourceType: ResourceType
  register: any
  errors: any
}

const Quantity: FC<IProps> = ({ resourceType, register, errors }) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col justify-start space-y-2">
      <Input
        type="number"
        label={t('signup.products.qty')}
        labelPosition="horizontal"
        {...register('quantity')}
      />

      <Input
        label={t('signup.products.unit_type')}
        labelPosition="horizontal"
        {...register('unit_type')}
      />

      <Input
        label={t('signup.products.packaging')}
        labelPosition="horizontal"
        {...register('packaging_type')}
      />
    </div>
  )
}

export default Quantity
