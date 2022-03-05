import Input from '@/components/Form/Input'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ResourceType } from '@/components/SignUpProducts/types'
import clsx from "clsx";

interface IProps {
  resourceType: ResourceType
}

const Quantity: FC<IProps> = ({ resourceType }) => {
  const { t } = useTranslation()

  return (
    <div className={clsx(
      'flex justify-start',
      'md:flex-row md:align-top md:space-x-6',
      'flex-col'
    )}>
      <Input
        name={`products_${resourceType}_qty`}
        type="number"
        label={t('signup.products.qty')}
        labelPosition="horizontal"
      />

      <Input
        name={`products_${resourceType}_unit_type`}
        label={t('signup.products.unit_type')}
        labelPosition="horizontal"
      />

      <Input
        name={`products_${resourceType}_packaging`}
        label={t('signup.products.packaging')}
        labelPosition="horizontal"
      />
    </div>
  )
}

export default Quantity
