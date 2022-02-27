import type { AppProps } from 'next/app'
import { FC } from 'react'
import { appWithTranslation } from 'next-i18next'
import { withStore } from '../store'

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
)
export default withStore(appWithTranslation(WrappedApp))
