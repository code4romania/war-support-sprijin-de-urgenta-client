import Layout from '@/components/Layout'
import i18n from 'i18next'
import type { AppProps } from 'next/app'
import { FC } from 'react'
import { initReactI18next } from 'react-i18next'
import common_en from '../public/locales/en/common.json'
import common_ro from '../public/locales/ro/common.json'
import common_ua from '../public/locales/ua/common.json'

import '../styles/globals.css'
import { withStore } from '../store'
import { reauthenticate, deauthenticate } from '@/store/reducers/auth'
import { useDataWithToken } from '@/hooks/useData'
import endpoints from 'endpoints.json'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '@/store/types/state.type'

i18n.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: 'ro',
  defaultNS: 'common',
  resources: {
    en: { common: common_en },
    ro: { common: common_ro },
    ua: { common: common_ua },
  },
})

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {
  const dispatch = useDispatch()
  const token = useSelector((state: State) => state.auth.token)
  const { data } = useDataWithToken(endpoints['auth/user'], token)
  if (data) {
    dispatch(reauthenticate(token))
  }
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
export default withStore(WrappedApp)
