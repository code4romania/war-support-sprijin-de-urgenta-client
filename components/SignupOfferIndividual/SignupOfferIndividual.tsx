import Button from '@/components/Button'
import { useTranslation } from 'react-i18next'

export interface ISignupOfferIndividualProps {}

const SignupOfferIndividual = ({}: ISignupOfferIndividualProps) => {
  const { t } = useTranslation('common')

  return (
    <div className={'grid gap-4'}>
      <p>
        {t('signup.offer.individualCard.content')}
      </p>
      <div className={'font-semibold'}>
        {t('signup.offer.individualCard.ctaTitle')}
      </div>
      <div className={'max-w-[30ch]'}>
        <Button
          text={t('signup.offer.individualCard.ctaButton')}
          route={'https://harta.sprijindeurgenta.ro'}
          size={'medium'}
        />
      </div>
    </div>
  )
}

export default SignupOfferIndividual
