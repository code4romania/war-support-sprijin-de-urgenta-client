import Button from '@/components/Button'
import clsx from 'clsx'
import type { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import useSWR, { Fetcher } from 'swr'

interface ICategory {
  pk: number
  name: string
}

const fetcher: Fetcher<ICategory[]> = (args: any) =>
  fetch(args).then((res) => res.json())

const HomePage: NextPage = () => {
  const { t } = useTranslation()
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_PUBLIC_API}/categories_by_name`,
    fetcher
  )
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
          {data?.map((item: ICategory) => (
            <Button key={item.pk} text={item.name} route="/register" />
          ))}
        </div>
      </div>
    </main>
  )
}

export default HomePage
