import type { NextPage } from 'next'
import Button from '@/components/Button'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

const LoginPage: NextPage = () => {
  const { t } = useTranslation()

  return (
    <main className={clsx('grid place-items-center', 'h-screen')}>
      <section className="space-y-16 w-96">
        <form className="flex flex-col gap-6 ">
          <div className="">
            <label
              htmlFor="userName"
              className="block text-base font-semibold text-gray-700"
            >
              {t('login.userLabel')}
            </label>
            <input
              type="text"
              name="userName"
              id="userName"
              className={clsx(
                'block w-full h-10 mt-1',
                'px-3 py-2',
                'border border-gray-100 rounded-md',
                'focus:ring-blue-600 focus:border-blue-600 focus:border-2 focus:outline-none'
              )}
            />
          </div>
          <div className="">
            <label
              htmlFor="password"
              className="block text-base font-semibold text-gray-700"
            >
              {t('login.passwordLabel')}
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className={clsx(
                'block w-full h-10 mt-1',
                'px-3 py-2',
                'border border-gray-100 rounded-md',
                'focus:ring-blue-600 focus:border-blue-600 focus:border-2 focus:outline-none'
              )}
            />
          </div>
          <a href="#" className="self-end text-gray-300 mt-[-16px]">
            {t('login.forgotPass')}
          </a>
        </form>
        <div className="space-y-4">
          <Button text={t('login.submit')} size="medium" variant="primary" />
          <Button text={t('login.signUp')} size="medium" variant="secondary" />
        </div>
      </section>
    </main>
  )
}

export default LoginPage
