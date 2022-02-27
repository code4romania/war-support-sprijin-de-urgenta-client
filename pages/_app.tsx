import type { AppProps } from 'next/app'
import { FC } from 'react'
import { withStore } from '../store'
import '../styles/globals.css'

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
)
export default withStore(WrappedApp)
