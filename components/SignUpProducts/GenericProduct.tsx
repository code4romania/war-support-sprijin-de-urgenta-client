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
}

const GenericProduct: FC<IProps> = ({ resourceType, counties }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm()

  return (
    <ProductTypeWrapper>
      <Product resourceType={resourceType} />

      <Quantity resourceType={resourceType} />

      <ExpireDate resourceType={resourceType} />

      <Location
        resourceType={resourceType}
        counties={counties}
        control={control}
        register={register}
        errors={errors}
      />
    </ProductTypeWrapper>
  )
}

export default GenericProduct
