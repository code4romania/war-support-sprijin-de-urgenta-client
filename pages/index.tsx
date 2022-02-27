import FormEntryButton from '@/components/FormEntryButton'
import clsx from 'clsx'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <main
      className={clsx('bg-gray-50', 'h-full min-h-screen', 'px-36')}
    >
      <div className='mb-24'>
        <h1 className={clsx('text-2xl font-bold mb-6')}>Centralizare oferte asistență umanitară</h1>
        <h2 className={clsx('max-w-lg')}>Prin completarea acestui formular vei contribui la o coordonare eficientă a tuturor resurselor oferite.</h2>
      </div>
      <div>
        <h2 className='leading-8 mb-4'>Vreau să ajut cu:</h2>
        <div className={clsx('grid grid-cols-2 gap-4')}>
          <FormEntryButton text="Cazare" route="/cazare" />
          <FormEntryButton text="Produse" route="/produse" />
          <FormEntryButton text="Servicii" route="/servicii" />
          <FormEntryButton text="Altele" route="/altele" />
        </div>
      </div>
    </main >
  )
}

export default Home