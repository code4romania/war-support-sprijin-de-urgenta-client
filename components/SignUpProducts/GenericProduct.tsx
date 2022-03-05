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
}

const GenericProduct: FC<IProps> = ({ resourceType, counties, category }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm()

  const onSubmit = (values: any) => {
    console.log('values', { ...values, category })
  }

  return (
    <ProductTypeWrapper onSubmit={handleSubmit(onSubmit)}>
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
