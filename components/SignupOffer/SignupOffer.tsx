import { useTranslation } from 'react-i18next'
import SignupOfferIndividual from '@/components/SignupOfferIndividual'

export interface ISignupOfferProps {
  children: React.ReactNode
}

const SignupOffer = ({ children }: ISignupOfferProps) => {
  const { t } = useTranslation()

  return (
    <div className={'grid md:grid-cols-2 gap-8 md:gap-24'}>
      <div>
        <div className={'font-semibold mb-6 text-xl'}>
          {t('signup.offer.individual')}:
        </div>
        <SignupOfferIndividual />
      </div>
      <div>
        <div className={'font-semibold mb-6 text-xl'}>{t('signup.offer.legal')}:</div>
        {children}
      </div>
    </div>
  )
}

export default SignupOffer
