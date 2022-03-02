import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useProductsForm } from '@/hooks/useData'

export interface ISignUpProductsProps {
  defaultProp?: string
}

const SignUpProducts = ({}: ISignUpProductsProps) => {
  const { t } = useTranslation()
  const { data } = useProductsForm();

  return (
    <section
      className={clsx(
        'container grid place-items-start',
        'bg-blue-50 rounded',
        'mx-auto px-8 py-7'
      )}
    >
      <h3 className="text-lg font-semibold">{t('products')}</h3>
    </section>
  )
}

export default SignUpProducts
