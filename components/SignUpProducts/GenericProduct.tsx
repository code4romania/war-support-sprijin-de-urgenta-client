import ExpireDate from '@/components/SignUpProducts/common/ExpireDate'
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
  category: number
  onSubmit: (values: DonateItemRequest) => void
}

type GenericProductForm = {
  county_coverage: string[]
  town: string;
  name: string;
  quantity: number;
  unit_type: string;
  packaging_type: string;
  expiration_date: string;
}

const GenericProduct: FC<IProps> = ({ counties, onSubmit }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<GenericProductForm>()

  const onFormSubmit = (values: GenericProductForm) => {
    const donateItemRequest: DonateItemRequest = { ...values };
    onSubmit(donateItemRequest);
  }

  return (
    <ProductTypeWrapper onSubmit={handleSubmit(onFormSubmit)}>
      <Location
        counties={counties}
        control={control}
        register={register}
        errors={errors}
        names={{
          county_coverage: 'county_coverage',
          town: 'town'
        }}
      />

      <Product
        register={register}
        errors={errors}
        names={{ name: 'name' }}
      />

      <Quantity
        register={register}
        errors={errors}
        names={{
          quantity: 'quantity',
          packaging_type: 'packaging_type',
          unit_type: 'unit_type'
        }}
      />

      <ExpireDate
        register={register}
        errors={errors}
        names={{
          expiration_date: 'expiration_date'
        }}
      />
    </ProductTypeWrapper>
  )
}

export default GenericProduct
