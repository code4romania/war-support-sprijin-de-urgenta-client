import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import Image from '@/components/Image'
import LanguageSelector from '@/components/Header/LanguageSelector'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '@/store/types/state.type'
import { deauthenticate } from '@/store/reducers/auth'
import { envVars } from '@/utils/envVars'
import { useRouter } from 'next/router'
import GovRo from '../../public/gov_ro.png'
import GovRoMobile from '../../public/gov_ro_mobile.svg'
import DsuLogo from '../../public/DSU_logo.png'
import code4romania from '../../public/code4romania.svg'
import CodeLogo from '../../public/code_logo.svg'
import Logo from '../../public/logo.svg'

const PARTNERSHIPS = [
  {
    id: 1,
    src: GovRo,
    alt: 'Romanian GOV Logo',
    url: 'https://gov.ro/',
    className: 'hidden md:block',
    width: 119,
    height: 38,
  },
  {
    id: 2,
    src: GovRoMobile,
    alt: 'Romanian GOV Logo',
    url: 'https://gov.ro/',
    className: 'md:hidden',
    width: 38,
    height: 38,
  },
  {
    id: 3,
    src: DsuLogo,
    alt: 'DSU Logo',
    url: 'http://www.dsu.mai.gov.ro/',
    width: 87,
    height: 38,
  },
]

const flexItemsCenter: string = clsx('flex items-center')
const smallBoldTextWithGrayAndMarginAside: string = clsx(
  'text-sm font-bold text-gray-500  mx-4'
)

const Header = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state: State) => state.auth.userPk)
  const isLoadingUser = useSelector((state: State) => state.auth.loading)
  const handleLogout = async () => {
    await router.push('/')
    dispatch(deauthenticate())
  }
  const loginUrl = envVars.loginUrl || ''

  return (
    <div className="w-full mx-auto">
      <div className="bg-gray-50">
        <div
          className={`${flexItemsCenter} 
          ${clsx('py-3 px-2', 'container mx-auto')}`}
        >
          <Image
            src={CodeLogo}
            alt="Code 4 Romania logo"
            width={90}
            height={27}
          />
          <div className="flex flex-col ml-6 text-sm font-medium text-gray-700 md:flex-row md:gap-1">
            <span>{`${t('solution.by')} `}</span>
            <a
              href="https://www.code4.ro/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-900 hover:underline whitespace-nowrap"
            >
              {t('findout.more')}
            </a>
          </div>
        </div>
      </div>
      <div className="border-b-2 border-gray-50">
        <div className="container px-2 mx-auto ">
          <div
            className={`${flexItemsCenter} ${clsx('justify-between', 'py-4')}`}
          >
            <div className={`${flexItemsCenter}`}>
              <Link href="/" passHref>
                <a>
                  <Image
                    src={Logo}
                    alt="Sprijin de urgență"
                    width={173}
                    height={42}
                  />
                </a>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              {!isLoadingUser && (
                <div>
                  {isLoggedIn ? (
                    <div className="cursor-pointer" onClick={handleLogout}>
                      Logout
                    </div>
                  ) : (
                    <Link href={loginUrl}>Login</Link>
                  )}
                </div>
              )}
              <LanguageSelector />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${flexItemsCenter} w-full max-w-[1350px] mx-auto justify-end py-3 pr-4`}
      >
        <span className={smallBoldTextWithGrayAndMarginAside}>
          {t('partenership.with')}
        </span>
        <div className="flex items-center gap-2">
          {PARTNERSHIPS.map(
            ({ id, src, alt, url, className, width, height }) => (
              <a key={id} href={url} rel="noreferrer" target="_blank">
                <Image
                  src={src}
                  alt={alt}
                  className={clsx(className)}
                  width={width}
                  height={height}
                />
              </a>
            )
          )}
        </div>
        <span className={`${smallBoldTextWithGrayAndMarginAside} lowercase`}>
          {t('created.by')}
        </span>
        <a href="https://www.code4.ro/" rel="noreferrer" target="_blank">
          <Image
            src={code4romania}
            alt="Code 4 Romania logo"
            width={120}
            height={38}
          />
        </a>
      </div>
    </div>
  )
}

export default Header
