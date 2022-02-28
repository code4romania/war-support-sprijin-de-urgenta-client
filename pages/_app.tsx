import Layout from '@/components/Layout'
import i18n from "i18next"
import type { AppProps } from 'next/app'
import { FC } from 'react'
import { initReactI18next } from "react-i18next"
import common_en from '../public/locales/en/common.json'
import common_ro from '../public/locales/ro/common.json'
import common_ua from '../public/locales/ua/common.json'
import { withStore } from '../store'
import '../styles/globals.css'

i18n
  .use(initReactI18next)
  .init({
    interpolation: { escapeValue: false },
    lng: 'ro',
    defaultNS: 'common',
    resources: {
      en: { common: common_en },
      ro: { common: common_ro },
      ua: { common: common_ua }
    }
  });

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
)
export default withStore(WrappedApp);
