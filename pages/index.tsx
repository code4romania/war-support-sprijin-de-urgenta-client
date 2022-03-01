import clsx from 'clsx'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { setDefaultOffer } from '@/store/reducers/signup'

import Button from '@/components/Button'
import { useDispatch } from 'react-redux'

const HomePage: NextPage = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleClick = (id: number) => {
    if (id) {
      dispatch(setDefaultOffer(id))
      router.push('/sign-up')
    }
  }

  return (
    <main className={clsx('layout h-full')}>
      <section className="mb-24">
        <h1 className={clsx('text-2xl font-bold mb-6')}>
          {t('homepage.title')}
        </h1>
        <h2 className={clsx('max-w-lg text-xl')}>{t('homepage.subtitle')}</h2>
      </section>
      <div>
        <h2 className="mb-4 text-xl leading-8">{t('wanna.help')}</h2>
        <div className={clsx('grid grid-cols-2 gap-8')}>
          {/* 
          //TODO Remove hardcoded, when backend is ready
          */}
          <Button text={t('housing')} onClick={() => handleClick(3)} />
          <Button text={t('products')} onClick={() => handleClick(2)} />
          <Button text={t('services')} onClick={() => handleClick(1)} />
          <Button text={t('others')} onClick={() => handleClick(4)} />
        </div>
      </div>
    </main>
  )
}

export default HomePage
