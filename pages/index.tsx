import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { State } from '@/store/types/state.type'
import { ICategory } from '@/store/reducers/categories/types'
import { setDefaultOffer } from '@/store/reducers/signup'
import Button from '@/components/Button'

import { setDefaultOffer } from '@/store/reducers/signup'

import Button from '@/components/Button'
import { useDispatch } from 'react-redux'

const HomePage: NextPage = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { categories } = useSelector((state: State) => state)

  const handleClick = (slug: string) => {
    if (slug) {
      dispatch(setDefaultOffer(slug))
      router.push('/sign-up')
    }
  }

  return (
    <main className="layout h-full">
      <section className="mb-24">
        <h1 className="text-2xl font-bold mb-6">{t('homepage.title')}</h1>
        <h2 className="max-w-lg text-xl">{t('homepage.subtitle')}</h2>
      </section>
      <div>
        <h2 className="mb-4 text-xl leading-8">{t('wanna.help')}</h2>
        <div className="grid grid-cols-2 gap-8">
          {categories.map((item: ICategory) => (
            <Button
              key={item.slug}
              text={t(item.slug)}
              onClick={() => handleClick(item.slug)}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

export default HomePage
