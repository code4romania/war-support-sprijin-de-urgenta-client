import Head from 'next/head'
import { ReactNode } from 'react'

import Footer from '../Footer'
import Header from '../Header'

export interface ILayoutProps {
  children: ReactNode
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <Head>
        <title>Sprijin de Urgență</title>
      </Head>
      <div className="flex flex-col min-h-full">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  )
}

export default Layout
