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
          {t('terms-and-conditions.title')}
        </h1>
        <Spacer size="3.5rem" />
        <p className="mb-4">{t('terms-and-conditions.p1')}</p>
        <p className="mb-4">{t('terms-and-conditions.p2')}</p>
        <p className="mb-4">{t('terms-and-conditions.p3')}</p>
        <h3 className="text-lg font-semibold">
          {t('terms-and-conditions.p4.header')}
        </h3>
        <p className="mb-4">{t('terms-and-conditions.p4.content.p1')}</p>
        <p className="mb-4">{t('terms-and-conditions.p4.content.p2')}</p>
        <p className="mb-4">{t('terms-and-conditions.p4.content.p3')}</p>

        <h3 className="text-lg font-semibold">
          {t('terms-and-conditions.p5.header')}
        </h3>
        <p className="mb-4">{t('terms-and-conditions.p5.content')}</p>

        <ul className="list-disc mb-4 pl-5 w-full py-5 md:w-1/2 md:py-0">
          <li>{t('terms-and-conditions.p5.content.li1')}</li>
          <li>{t('terms-and-conditions.p5.content.li2')}</li>
          <li>{t('terms-and-conditions.p5.content.li3')}</li>
        </ul>

        <h3 className="text-lg font-semibold">
          {t('terms-and-conditions.p6.header')}
        </h3>
        <p className="mb-4">{t('terms-and-conditions.p6.content')}</p>

        <h3 className="text-lg font-semibold">
          {t('terms-and-conditions.p7.header')}
        </h3>
        <p className="mb-4">{t('terms-and-conditions.p7.content')}</p>

        <h3 className="text-lg font-semibold">
          {t('terms-and-conditions.p8.header')}
        </h3>
        <p className="mb-4">{t('terms-and-conditions.p8.content')}</p>

        <h3 className="text-lg font-semibold">
          {t('terms-and-conditions.p9.header')}
        </h3>
        <p className="mb-4">{t('terms-and-conditions.p9.content')}</p>
        <ul className="list-disc mb-4 pl-5 w-full py-5 md:w-1/2 md:py-0">
          <li>{t('terms-and-conditions.p9.content.li1')}</li>
          <li>{t('terms-and-conditions.p9.content.li2')}</li>
          <li>{t('terms-and-conditions.p9.content.li3')}</li>
          <li>{t('terms-and-conditions.p9.content.li4')}</li>
          <li>{t('terms-and-conditions.p9.content.li5')}</li>
          <li>{t('terms-and-conditions.p9.content.li6')}</li>
        </ul>

        <h3 className="text-lg font-semibold">
          {t('terms-and-conditions.p10.header')}
        </h3>
        <p className="mb-4">{t('terms-and-conditions.p10.content.p1')}</p>
        <p className="mb-4">{t('terms-and-conditions.p10.content.p2')}</p>
        <p className="mb-4">{t('terms-and-conditions.p10.content.p3')}</p>
        <p className="mb-4">{t('terms-and-conditions.p10.content.p4')}</p>
        <p className="mb-4">{t('terms-and-conditions.p10.content.p5')}</p>

        <h3 className="text-lg font-semibold">
          {t('terms-and-conditions.p11.header')}
        </h3>
        <p className="mb-4">{t('terms-and-conditions.p11.content.p1')}</p>
        <p className="mb-4">{t('terms-and-conditions.p11.content.p2')}</p>
        <p className="mb-4">{t('terms-and-conditions.p11.content.p3')}</p>

        <h3 className="text-lg font-semibold">
          {t('terms-and-conditions.p12.header')}
        </h3>
        <p className="mb-4">{t('terms-and-conditions.p12.content')}</p>

        <h3 className="text-lg font-semibold">
          {t('terms-and-conditions.p13.header')}
        </h3>
        <p className="mb-4">{t('terms-and-conditions.p13.content.p1')}</p>
        <p className="mb-4">{t('terms-and-conditions.p13.content.p2')}</p>
        <p className="mb-4">{t('terms-and-conditions.p13.content.p3')}</p>

        <Spacer size="3.5rem" />
      </div>
    </>
  )
}

export default TermsConditions
