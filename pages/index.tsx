import Button from '@/components/Button'
import clsx from 'clsx'
import type { NextPage } from 'next'
import { useTranslation } from 'react-i18next'

const HomePage: NextPage = () => {
  const { t } = useTranslation()
  return (
    <main className={clsx('layout', 'bg-gray-50', 'h-full')}>
      <section className="mb-24">
        <h1 className={clsx('text-2xl font-bold mb-6')}>
          {t('homepage.title')}
        </h1>
        <h2 className={clsx('max-w-lg text-xl')}>{t('homepage.subtitle')}</h2>
      </section>
      <div>
        <h2 className="mb-4 text-xl leading-8">{t('wanna.help')}</h2>
        <div className={clsx('grid grid-cols-2 gap-8')}>
          <Button text={t('housing')} route="/cazare" />
          <Button text={t('products')} route="/produse" />
          <Button text={t('services')} route="/servicii" />
          <Button text={t('others')} route="/altele" />
        </div>
      </div>
    </main>
  )
}

export default HomePage
