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


  // Ugly hack to make sure the food form button only shows on the request pages
  
  //Request Categories List should contain all categories
  const requestCategoriesList = categories
  //Offer Categories List should all categories except 'foodform'
  const offerCategoriesList = categories.filter(
    (category: ICategory) => category.slug !== 'foodform'
  )
  
  //Depending on the type of the page, we will use the appropriate categories list
  const categoriesList = type === 'request' ? requestCategoriesList : offerCategoriesList

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
          <div className="flex flex-wrap">
            {categoriesList.map((item: ICategory) => (
              <Button
                route={item?.href}
                key={item.slug}
                text={t(item.slug)}
                onClick={() => handleClick(item.slug)}
                className="flex-[1_1_35%] m-4 md:m-8"
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
