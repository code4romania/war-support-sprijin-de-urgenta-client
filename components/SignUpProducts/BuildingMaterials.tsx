import Location from '@/components/SignUpProducts/common/Location'
import { FC } from 'react'
import Quantity from '@/components/SignUpProducts/common/Quantity'
import Product from '@/components/SignUpProducts/common/Product'
import { ResourceType } from '@/components/SignUpProducts/types'
import ProductTypeWrapper from '@/components/SignUpProducts/common/ProductTypeWrapper'
import { County } from '@/components/SignUpProducts/types'
import { useForm } from 'react-hook-form'

interface IProps {
  resourceType: ResourceType
  counties: County[]
}

const BuildingMaterials: FC<IProps> = ({ resourceType, counties }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm()

  const onSubmit = (values: any) => {
    console.log('values', values)
  }

  return (
    <ProductTypeWrapper onSubmit={handleSubmit(onSubmit)}>
      <Location
        resourceType={resourceType}
        counties={counties}
        register={register}
        control={control}
        errors={errors}
      />
      <Product resourceType={resourceType} errors={errors} register={register} />

      <Quantity resourceType={resourceType} errors={errors} register={register} />

    </ProductTypeWrapper>
  )
}
export default BuildingMaterials
