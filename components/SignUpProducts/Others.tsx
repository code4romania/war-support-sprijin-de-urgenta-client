import Textarea from '@/components/Form/Textarea'
import Product from '@/components/SignUpProducts/common/Product'
import ProductTypeWrapper from '@/components/SignUpProducts/common/ProductTypeWrapper'
import { DonateItemRequest } from 'api'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import RadioGroup from '@/components/Form/RadioGroup'
import Radio from '@/components/Form/Radio'
import clsx from 'clsx'
import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

interface IProps {
  onSubmit: (values: DonateItemRequest) => void
}

type OthersForm = {
  county_coverage: string[]
  has_transportation: boolean;
  unit_type: string;
  name: string;
  description?: string;
}

const Others: FC<IProps> = ({ onSubmit }) => {
  const { t } = useTranslation()

  const othersSchema: SchemaOf<OthersForm> = yup.object().shape({
    county_coverage: yup.array()
      .min(1, t('error.county.minOne'))
      .of(yup.string().required()),
    has_transportation: yup.boolean()
      .typeError(t('error.must.be.boolean'))
      .required(t('error.has_transportation.required')),
    name: yup.string().required(t('error.productName.required')),
    unit_type: yup.string().required(t('error.unitType.required')),
    description: yup.string(),
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<OthersForm>({
    resolver: yupResolver(othersSchema),
    reValidateMode: 'onSubmit',
    mode: 'all',
    defaultValues: {
      county_coverage: []
    }
  })

  const onFormSubmit = (values: DonateItemRequest) => {
    const donateItemRequest: DonateItemRequest = { ...values };
    onSubmit(donateItemRequest);
  }

  return (
    <ProductTypeWrapper onSubmit={handleSubmit(onFormSubmit)}>
      <RadioGroup
        label={t('services.offerTransport')}
      >
        <div className={clsx('flex flex-row gap-6')}>
          <Radio value="true" {...register('has_transportation')}>
            {t('yes')}
          </Radio>
          <Radio value="false" {...register('has_transportation')}>
            {t('no')}
          </Radio>
        </div>
      </RadioGroup>
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
