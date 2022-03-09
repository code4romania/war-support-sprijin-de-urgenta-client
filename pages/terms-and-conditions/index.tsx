import { useTranslation } from 'react-i18next'

import Spacer from '@/components/Spacer'
import SubHeader from '@/components/SubHeader'

const TermsConditions = () => {
  const { t } = useTranslation()

  return (
    <>
      <SubHeader />
      <div className="layout">
        <Spacer size="3.5rem" />
        <h1 className="text-3xl font-bold leading-normal md:max-w-[30ch]">
          {t('cookie.policy.title')}
        </h1>
        <Spacer size="3.5rem" />
        <p className="mb-4">{t('cookie.policy.p1')}</p>
        <p className="mb-4">{t('cookie.policy.p2')}</p>
        <h3 className="text-lg font-semibold">
          {t('cookie.policy.whatiscookie.header')}
        </h3>
        <p className="mb-4">{t('cookie.policy.whatiscookie.p1')}</p>
        <p className="mb-4">{t('cookie.policy.whatiscookie.p2')}</p>
        <p className="mb-4">{t('cookie.policy.whatiscookie.p3')}</p>
        <p className="mb-4">{t('cookie.policy.whatiscookie.p4')}</p>
        <p className="mb-4">{t('cookie.policy.whatiscookie.p5')}</p>
        <h3 className="text-lg font-semibold">
          {t('cookie.policy.p3.header')}
        </h3>
        <p className="mb-4">{t('cookie.policy.p3.content')}</p>
        <h3 className="text-lg font-semibold">
          {t('cookie.policy.p4.header')}
        </h3>
        <p className="mb-4">{t('cookie.policy.p4.content')}</p>
        <h3 className="text-lg font-semibold">
          {t('cookie.policy.p5.header')}
        </h3>
        <p className="mb-4">{t('cookie.policy.p5.content')}</p>

        <h3 className="text-lg font-semibold">
          {t('cookie.policy.p6.header')}
        </h3>
        <p className="mb-4">{t('cookie.policy.p6.content')}</p>
        <ul className="w-full py-5 md:w-1/2 md:px-3 md:py-0">
          <li>{t('cookie.policy.type.general')}</li>
          <li>{t('cookie.policy.type.registration')}</li>
          <li>{t('cookie.policy.type.thirdparty')}</li>
        </ul>
        <h3 className="mt-4 text-lg font-semibold">
          {t('cookie.policy.type.general')}
        </h3>
        <p className="mb-4">{t('cookie.policy.type.general.content')}</p>
        <h3 className="text-lg font-semibold">
          {t('cookie.policy.type.registration')}
        </h3>
        <p className="mb-4">{t('cookie.policy.type.registration.content')}</p>
        <h3 className="text-lg font-semibold">
          {t('cookie.policy.type.thirdparty')}
        </h3>
        <p className="mb-4">{t('cookie.policy.type.thirdparty.content')}</p>

        <h3 className="text-lg font-semibold">
          {t('cookie.policy.p7.header')}
        </h3>
        <p className="mb-4">{t('cookie.policy.p7.content')}</p>

        <h3 className="text-lg font-semibold">
          {t('cookie.policy.p8.header')}
        </h3>
        <p className="mb-4">{t('cookie.policy.p8.content')}</p>
        <p className="mb-4">{t('cookie.policy.p9')}</p>

        <h3 className="text-lg font-semibold">
          {t('cookie.policy.security.header')}
        </h3>
        <p className="mb-4">{t('cookie.policy.security.p1')}</p>
        <p className="mb-4">{t('cookie.policy.security.p2')}</p>
        <p className="mb-4">{t('cookie.policy.security.p3')}</p>

        <h3 className="text-lg font-semibold">
          {t('cookie.policy.other.header')}
        </h3>
        <p className="mb-4">{t('cookie.policy.other.p1')}</p>
        <p className="mb-4">{t('cookie.policy.other.p2')}</p>

        <h3 className="text-lg font-semibold">
          {t('cookie.policy.advice.header')}
        </h3>
        <p className="mb-4">{t('cookie.policy.advice.p1')}</p>
        <p className="mb-4">{t('cookie.policy.advice.p2')}</p>
        <ul className="w-full py-5 md:w-1/2 md:px-3 md:py-0">
          <li className="mb-3">{t('cookie.policy.advice.p1.1')}</li>
          <li className="mb-3">{t('cookie.policy.advice.p1.2')}</li>
          <li className="mb-3">{t('cookie.policy.advice.p1.3')}</li>
        </ul>
        <p className="mb-4">{t('cookie.policy.advice.p3')}</p>

        <h3 className="text-lg font-semibold">
          {t('cookie.policy.turnoff.header')}
        </h3>
        <p className="mb-4">{t('cookie.policy.turnoff.p1')}</p>
        <p className="mb-4">{t('cookie.policy.turnoff.p2')}</p>
        <p className="mb-10">{t('cookie.policy.turnoff.p3')}</p>

        <p className="mb-4">
          {t('cookie.policy.p10')}
          <a href="http://www.youronlinechoices.com/ro/">
            http://www.youronlinechoices.com/ro/
          </a>
        </p>
        <Spacer size="3.5rem" />
      </div>
    </>
  )
}

export default TermsConditions
