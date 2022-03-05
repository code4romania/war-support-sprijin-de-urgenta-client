import Location from '@/components/SignUpProducts/common/Location'
import Quantity from '@/components/SignUpProducts/common/Quantity'
import Product from '@/components/SignUpProducts/common/Product'
import { FC } from 'react'
import { ResourceType } from '@/components/SignUpProducts/types'
import ExpireDate from '@/components/SignUpProducts/common/ExpireDate'
import ProductTypeWrapper from '@/components/SignUpProducts/common/ProductTypeWrapper'
import { County } from '@/components/SignUpProducts/types'
import { useForm } from 'react-hook-form'

interface IProps {
  resourceType: ResourceType
  counties: County[]
  category: number
  onSubmit: (values:any) => void
}

const GenericProduct: FC<IProps> = ({ resourceType, counties, category, onSubmit }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm()

  const onFormSubmit = (values: any) => {
    console.log('values', { ...values, category })
    onSubmit(values);
  }

  return (
    <ProductTypeWrapper onSubmit={handleSubmit(onFormSubmit)}>
      <Location
        resourceType={resourceType}
        counties={counties}
        control={control}
        register={register}
        errors={errors}
      />

      <Product
        resourceType={resourceType}
        register={register}
        errors={errors}
      />

      <Quantity
        resourceType={resourceType}
        register={register}
        errors={errors}
      />

      <ExpireDate
        resourceType={resourceType}
        register={register}
        errors={errors}
      />
    </ProductTypeWrapper>
  )
}

export default GenericProduct
