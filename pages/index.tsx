import FormEntryButton from '@/components/FormEntryButton'
import clsx from 'clsx'
import type { NextPage } from 'next'
import { useTranslation } from 'react-i18next'

const Home: NextPage = () => {
  const { t } = useTranslation();
  return (
    <main
      className={clsx('bg-gray-50', 'h-full min-h-screen', 'px-36')}
    >
      <div className='mb-24'>
        <h1 className={clsx('text-2xl font-bold mb-6')}>{t('homepage.title')}</h1>
        <h2 className={clsx('max-w-lg')}>{t('homepage.subtitle')}</h2>
      </div>
      <div>
        <h2 className='leading-8 mb-4'>{t('wanna.help')}</h2>
        <div className={clsx('grid grid-cols-2 gap-4')}>
          <FormEntryButton text={t('housing')} route="/cazare" />
          <FormEntryButton text={t('products')} route="/produse" />
          <FormEntryButton text={t('services')} route="/servicii" />
          <FormEntryButton text={t('others')} route="/altele" />
        </div>
      </div>
    </main >
  )
}

export default Home