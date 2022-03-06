import Textarea from '@/components/Form/Textarea'
import Product from '@/components/SignUpProducts/common/Product'
import ProductTypeWrapper from '@/components/SignUpProducts/common/ProductTypeWrapper'
import { DonateItemRequest } from 'api'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface IProps {
  onSubmit: (values: DonateItemRequest) => void
}

type OthersForm = {
  county_coverage: string[]
  unit_type: string;
  name: string;
  description: string;
}

const Others: FC<IProps> = ({ onSubmit }) => {
  const { t } = useTranslation()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<OthersForm>()

  const onFormSubmit = (values: DonateItemRequest) => {
    const donateItemRequest: DonateItemRequest = { ...values };
    onSubmit(donateItemRequest);
  }

  return (
    <ProductTypeWrapper onSubmit={handleSubmit(onFormSubmit)}>
      <Product
        register={register}
        errors={errors}
        names={{
          name: 'name'
        }}
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
