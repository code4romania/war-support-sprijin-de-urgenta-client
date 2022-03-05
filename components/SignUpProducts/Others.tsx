import Textarea from '@/components/Form/Textarea'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import ProductTypeWrapper from '@/components/SignUpProducts/common/ProductTypeWrapper'
import Product from '@/components/SignUpProducts/common/Product'
import { ResourceType } from '@/components/SignUpProducts/types'

interface IProps {
  resourceType: ResourceType
  onSubmit: (values: any) => void
}

const Others: FC<IProps> = ({ resourceType, onSubmit }) => {
  const { t } = useTranslation()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const onFormSubmit = (values: any) => {
    onSubmit(values)
  }

  return (
    <ProductTypeWrapper onSubmit={handleSubmit(onFormSubmit)}>
      <Product
        resourceType={resourceType}
        register={register}
        errors={errors}
      />
      <Textarea
        {...register('description')}
        label={t('signup.products.description')}
        errors={errors['description']}
      />
    </ProductTypeWrapper>
  )
}

export default Others
