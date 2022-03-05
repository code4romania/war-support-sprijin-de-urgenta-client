import { FC } from 'react'
import Checkbox from '@/components/Form/Checkbox'
import { useTranslation } from 'react-i18next'
import Input from '@/components/Form/Input'
import Textarea from '@/components/Form/Textarea'
import Location from '@/components/SignUpProducts/common/Location'
import clsx from 'clsx'
import Quantity from '@/components/SignUpProducts/common/Quantity'
import { ResourceType } from '@/components/SignUpProducts/types'
import ProductTypeWrapper from '@/components/SignUpProducts/common/ProductTypeWrapper'
import { County } from '@/components/SignUpProducts/types'
import { useForm } from 'react-hook-form'

interface IProps {
  resourceType: ResourceType
  counties?: County[]
}

const TextileProduct: FC<IProps> = ({ resourceType, counties }) => {
  const { t } = useTranslation()
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm()

  const onSubmit = (values: any)=> {
    console.log('on submit', values)
  }

  return (
    <ProductTypeWrapper onSubmit={handleSubmit(onSubmit)}>
      <Checkbox name={`products_${resourceType}_clothing`}>
        {t('signup.products.clothing')}
      </Checkbox>
      <div className={clsx('ml-5 grid grid-cols-2')}>
        <Checkbox name={`products_${resourceType}_female`}>
          {t('signup.products.female')}
        </Checkbox>
        <Checkbox name={`products_${resourceType}_male`}>
          {t('signup.products.male')}
        </Checkbox>
        <Checkbox name={`products_${resourceType}_children`}>
          {t('signup.products.children')}
        </Checkbox>
        <Input
          name={`products_${resourceType}_children_age`}
          label={t('signup.products.children.age')}
          labelPosition="horizontal"
        />
      </div>

      <Checkbox name={`products_${resourceType}_blankets`}>
        {t('signup.products.blankets')}
      </Checkbox>

      <Checkbox name={`products_${resourceType}_sheets`}>
        {t('signup.products.sheets')}
      </Checkbox>

      <Checkbox name={`products_${resourceType}_sleepingBags`}>
        {t('signup.products.sleepingBags')}
      </Checkbox>

      <div>
        <Checkbox name={`products_${resourceType}_others`}>
          {t('signup.products.others')}
        </Checkbox>
        <div className="ml-5">
          <Textarea name={`products_${resourceType}_others_content`} />
        </div>
      </div>

      <Quantity resourceType="textile" register={register} errors={errors} />

      <Location resourceType="textile" counties={counties} control={control} register={register} errors={errors}  />
    </ProductTypeWrapper>
  )
}

export default TextileProduct
