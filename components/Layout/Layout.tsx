import clsx from 'clsx'
import { ReactNode } from 'react'
import Footer from '../Footer'

import Header from '../Header'

export interface ILayoutProps {
  children: ReactNode
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className={clsx('flex flex-col gap-8 min-h-full')}>
      <Header />
      {children}
      <Footer/>
    </div>
  )
}

export default Layout
