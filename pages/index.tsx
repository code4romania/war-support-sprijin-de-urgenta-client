import type { NextPage } from 'next'
import clsx from 'clsx'

const Home: NextPage = () => {
  return (
    <main
      className={clsx(
        'grid place-content-center gap-4 bg-gray-50',
        'h-full min-h-screen'
      )}
    >
      <h1 className="text-5xl">Sprijin de Urgenta</h1>
    </main>
  )
}

export default Home
