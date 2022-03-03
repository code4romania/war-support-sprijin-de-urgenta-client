import type { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import Button from '@/components/Button'
import SubHeader from '@/components/SubHeader'
import WelcomeBanner from '@/components/WelcomeBanner'
import Spacer from '@/components/Spacer'
import CallToAction from '@/components/CallToAction'
import clsx from 'clsx'

const HomePage: NextPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <SubHeader />
      <Spacer size="3.75rem" />
      <main className="h-full layout">
        <WelcomeBanner />
        <Spacer size="6.5rem" />
        <section>
          <div className="flex flex-col gap-6 md:gap-8 md:flex-row">
            <Button text={t('homepage.option_one')} route="/offer" />
            <Button text={t('homepage.option_two')} route="/request" />
          </div>
        </section>
      </main>
      <Spacer size="6.5rem" />
      <section className="">
        <div
          className={clsx('flex flex-col gap-3 justify-center ', 'lg:flex-row')}
        >
          <div
            className={clsx(
              'bg-gray-100 w-full flex flex-col items-start sm:items-center'
            )}
          >
            <div className="lg:self-end max-w-[35rem] px-5 md:px-0">
              <CallToAction
                headingOne={t('cta.offer_stay.heading_one')}
                headingTwo={t('cta.offer_stay.heading_two')}
                description={t('cta.offer_stay.description')}
                ctaLabel={t('cta.offer_stay.button_label')}
              />
            </div>
          </div>

          <div
            className={clsx(
              'bg-gray-100 w-full flex flex-col items-start sm:items-center '
            )}
          >
            <div className="lg:self-start max-w-[35rem] px-5 md:px-0">
              <CallToAction
                headingOne={t('cta.request_stay.heading_one')}
                headingTwo={t('cta.request_stay.heading_two')}
                description={t('cta.request_stay.description')}
                ctaLabel={t('cta.request_stay.button_label')}
              />
            </div>
          </div>
        </div>
      </section>
      <Spacer size="3rem" />
    </>
  )
}

export default HomePage
