import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import Image from '@/components/Image'
import LanguageSelector from '@/components/Header/LanguageSelector'

const PARTNERSHIPS = [
  {
    id: 1,
    src: '/gov_ro.svg',
    alt: 'Romanian GOV Logo',
  },
  {
    id: 2,
    src: '/dsu_logo.svg',
    alt: 'DSU Logo',
  },
]

const flexItemsCenter: string = clsx('flex items-center')
const smallBoldTextWithGrayAndMarginAside: string = clsx(
  'text-sm font-bold text-gray-300  mx-4'
)

const Header = () => {
  const { t } = useTranslation('common')
  return (
    <div className={clsx('w-full mx-auto')}>
      <div className=" bg-gray-50">
        <div
          className={`${flexItemsCenter} 
          ${clsx('py-1 md:py-3')} 
          ${clsx('container mx-auto')}`}
        >
          <div className="max-w-[90px]">
            <Image src={'/code_logo.svg'} alt="Code 4 Romania logo" />
          </div>
          <div className="ml-6 text-sm font-medium text-gray-700">
            <span>{`${t('solution.by')} `}</span>
            <a
              href="https://www.code4.ro/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline whitespace-nowrap"
            >
              {`${t('findout.more')}`}
            </a>
          </div>
        </div>
      </div>
      <div className="container px-2 mx-auto border-b border-gray-300">
        <div
          className={`${flexItemsCenter} ${clsx('justify-between', 'py-4')}`}
        >
          <div className={`${flexItemsCenter}`}>
            <div
              className={clsx('rounded-full w-[50px] h-[50px] bg-[#004aad]')}
            ></div>
            <div className={'flex flex-col ml-3 font-semibold text-lg'}>
              <span>SPRIJIN</span>
              <span className="underline">DE URGENTA</span>
            </div>
          </div>
          <LanguageSelector />
        </div>
      </div>
      <div
        className={`${flexItemsCenter} w-full max-w-[1350px] mx-auto justify-end py-3`}
      >
        <span className={smallBoldTextWithGrayAndMarginAside}>
          {t('partenership.with')}
        </span>
        <div className="flex items-center gap-2">
          {PARTNERSHIPS.map(({ id, src, alt }) => (
            <Image key={id} src={src} alt={alt} className="h-[38px]" />
          ))}
        </div>
        <span className={`${smallBoldTextWithGrayAndMarginAside} lowercase`}>
          {t('created.by')}
        </span>
        <Image
          src={'/code4romania.svg'}
          alt="Code 4 Romania logo"
          className="h-[34px]"
        />
      </div>
    </div>
  )
}

export default Header
