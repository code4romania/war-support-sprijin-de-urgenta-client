import clsx from 'clsx'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

const flexItemsCenter: string = clsx('flex items-center')

const Header = () => {
  const { t } = useTranslation('common')
  return (
    <div className={clsx('container', 'bg-gray-50 ', 'px-2 py-3 mx-auto')}>
      <div className={`${flexItemsCenter} ml-2`}>
        <div className="relative min-w-[90px]">
          <Image
            alt="Code 4 Romania logo"
            src={'/code_logo.svg'}
            layout="responsive"
            width={306}
            height={130}
            objectFit="contain"
          />
        </div>
        <div className="ml-6 text-sm font-medium text-gray-700">
          <span>{t('solution.by')}</span>
          <a
            href="https://www.code4.ro/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline whitespace-nowrap"
          >
            {` ${t('findout.more')}`}
          </a>
        </div>
      </div>
      <div
        className={`${flexItemsCenter} ${clsx(
          'justify-between',
          'py-4',
          'border-b border-gray-300'
        )}`}
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
        {/* 
          //TODO Add select form component from styleguide  
          */}
        <select name="locale" id="locale">
          <option value="ro">RO</option>
          <option value="en">EN</option>
        </select>
      </div>
      <div className={`${flexItemsCenter} justify-end py-[3px] mt-3`}>
        <span className="text-sm font-bold text-gray-300">
          {t('partenership.with')}
        </span>
        <div className="relative min-w-[180px] ml-3">
          <Image
            alt="DSU Logo"
            src={'/DSU_logo.png'}
            layout="responsive"
            width={306}
            height={130}
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  )
}

export default Header
