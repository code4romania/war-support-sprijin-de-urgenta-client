import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { initStore } from '../store'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={initStore()}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}
export default MyApp
