import Layout from '@/components/Layout'
import i18n from 'i18next'
import type { AppProps } from 'next/app'
import { FC } from 'react'
import { initReactI18next } from 'react-i18next'
import common_en from '../public/locales/en/common.json'
import common_ro from '../public/locales/ro/common.json'
import common_uk from '../public/locales/uk/common.json'
import common_ru from '../public/locales/ru/common.json'

import '../styles/fonts.css'
import '../styles/globals.css'

import { withStore } from '../store'
import {
  reauthenticate,
  deauthenticate,
  verificationFailed,
} from '@/store/reducers/auth'
import { useDataWithToken } from '@/hooks/useData'
import endpoints from 'endpoints.json'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '@/store/types/state.type'
import { useRouter } from 'next/router'
import LoadingSpinner from '@/components/LoadingSpinner'
import GTagScript from '@/components/GTagScript'

i18n.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: 'ro',
  defaultNS: 'common',
  resources: {
    en: { common: common_en },
    ro: { common: common_ro },
    uk: { common: common_uk },
    ru: { common: common_ru },
  },
})

const clientOnly = typeof window !== 'undefined'

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const token: string = useSelector((state: State) => state.auth.token)
  const { data } = useDataWithToken(endpoints['auth/user'], token)

  if (!data && pageProps.protected) {
    return <LoadingSpinner />
  }

  if (data?.email) {
    dispatch(reauthenticate({ token: token, userPk: data.pk }))
  } else {
    if (clientOnly) {
      if (data) {
        dispatch(verificationFailed())
        dispatch(deauthenticate())
      }
      if (pageProps.protected && pageProps.redirectTo) {
        router.push(pageProps.redirectTo)
      }
    }
  }

  return (
    <Layout>
      <GTagScript />
      <Component {...pageProps} />
    </Layout>
  )
}
export default withStore(WrappedApp)
