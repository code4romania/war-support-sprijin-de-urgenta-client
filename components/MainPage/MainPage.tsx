import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { State } from '@/store/types/state.type'
import { ICategory } from '@/store/reducers/categories/types'
import { setDefaultOffer } from '@/store/reducers/signup'

import Button from '@/components/Button'
import SubHeader from '@/components/SubHeader'
import WelcomeBanner from '@/components/WelcomeBanner'
import Spacer from '@/components/Spacer'
import CallToAction from '@/components/CallToAction'

export interface IMainPageProps {
  type: 'request' | 'offer'
}

const MainPage = ({ type }: IMainPageProps) => {
  const router = useRouter()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { categories } = useSelector((state: State) => state)

  const handleClick = (slug: string) => {
    if (slug) {
      dispatch(setDefaultOffer(slug))
      router.push({
        pathname: `/${type}/resources`,
      })
    }
  }

  return (
    <>
      <SubHeader />
      <Spacer size="3.75rem" />

      <main className="h-full layout">
        <WelcomeBanner />
        <Spacer size="3.5rem" />
        <section>
          <h2 className="mb-4 text-xl leading-8">{t(`${type}.subtitle`)}</h2>
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            {categories.map((item: ICategory) => (
              <Button
                key={item.slug}
                text={t(item.slug)}
                onClick={() => handleClick(item.slug)}
              />
            ))}
          </div>
        </section>
      </main>
      <Spacer size="5.5rem" />
      <section className="w-screen m-0 bg-gray-100">
        <div className="layout">
          <CallToAction
            headingOne={t(`cta.${type}_stay.heading_one`)}
            headingTwo={t(`cta.${type}_stay.heading_two`)}
            description={t(`cta.${type}_stay.description`)}
            ctaLabel={t(`cta.${type}_stay.button_label`)}
            goToUrl={'https://www.unacoperis.ro/'}
          />
        </div>
      </section>
      <Spacer size="4rem" />
    </>
  )
}

export default MainPage
