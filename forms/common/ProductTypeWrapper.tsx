import { FC, ReactNode } from 'react'
import Button from '@/components/Button'
import { useTranslation } from 'react-i18next'

interface IProps {
  children: ReactNode
  onSubmit: () => void
}

const ProductTypeWrapper: FC<IProps> = ({ children, onSubmit }) => {
  const { t } = useTranslation()

  return (
    <form className="flex flex-col h-full" onSubmit={onSubmit}>
      {children}
      <Button type="submit" className="mt-auto" text={t('add')} variant="tertiary" size="small" />
    </form>
  )
}

export default ProductTypeWrapper
