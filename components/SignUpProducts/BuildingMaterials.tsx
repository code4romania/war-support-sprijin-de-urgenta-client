import Location from '@/components/SignUpProducts/common/Location'
import Product from '@/components/SignUpProducts/common/Product'
import ProductTypeWrapper from '@/components/SignUpProducts/common/ProductTypeWrapper'
import Quantity from '@/components/SignUpProducts/common/Quantity'
import { DonateItemRequest } from 'api'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { MultiSelectOption } from '../Form/types'

interface IProps {
  counties: MultiSelectOption[]
  onSubmit: (values: DonateItemRequest) => void
}

type BuildingMaterialsForm = {
  county_coverage: string[]
  town: string;
  name: string;
  quantity: number;
  unit_type: string;
  packaging_type: string;
  expiration_date: string;
}

const BuildingMaterials: FC<IProps> = ({ counties, onSubmit }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<BuildingMaterialsForm>()

  const onFormSubmit = (values: DonateItemRequest) => {
    const donateItemRequest: DonateItemRequest = { ...values };
    onSubmit(donateItemRequest)
  }

  return (
    <ProductTypeWrapper onSubmit={handleSubmit(onFormSubmit)}>
      <Location
        counties={counties}
        register={register}
        control={control}
        errors={errors}
        names={{
          county_coverage: 'county_coverage',
          town: 'town'
        }}
      />
      <Product
        errors={errors}
        register={register}
        names={{ name: 'name' }}
      />

      <Quantity
        errors={errors}
        register={register}
        names={{
          quantity: 'quantity',
          packaging_type: 'packaging_type',
          unit_type: 'unit_type'
        }} />

    </ProductTypeWrapper>
  )
}
export default BuildingMaterials
