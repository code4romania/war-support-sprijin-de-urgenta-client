import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { FormPageProps } from '../FormPage/FormPage'

export interface IThankYouMessageProps {
  type: FormPageProps.Offer | FormPageProps.Request
}

const ThankYouMessage = ({ type }: IThankYouMessageProps) => {
  const { t } = useTranslation('common')
  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'w-full h-full',
        'border border-gray-200 rounded-md',
        'p-3 mb-3'
      )}
    >
      {t(`signup.resources.${type}.thankYouMessage`)}
    </div>
  )
}

export default ThankYouMessage
