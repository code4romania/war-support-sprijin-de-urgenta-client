import Layout from '@/components/Layout'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { FC } from 'react'
import { withStore } from '../store'
import '../styles/globals.css'

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
)
export default withStore(appWithTranslation(WrappedApp));
