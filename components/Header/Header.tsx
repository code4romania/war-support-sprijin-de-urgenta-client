import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import Image from '@/components/Image'

const flexItemsCenter: string = clsx('flex items-center')

const Header = () => {
  const { t } = useTranslation('common')
  return (
    <div className={clsx('w-full px-2 mx-auto')}>
      <div className=" bg-gray-50">
        <div
          className={`${flexItemsCenter} py-3 max-w-[1350px] w-[90%] mx-auto`}
        >
          <div className="relative max-w-[90px]">
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
      <div className="border-b border-gray-300">
        <div
          className={`${flexItemsCenter} ${clsx(
            'max-w-[1350px] w-[90%] mx-auto',
            'justify-between',
            'py-4'
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
      </div>
      <div
        className={`${flexItemsCenter} w-full max-w-[1350px] mx-auto justify-end py-3`}
      >
        <span className="text-sm font-bold text-gray-300">
          {t('partenership.with')}
        </span>
        <div className="w-full max-w-[120px] md:max-w-[180px]">
          <Image src={'/DSU_logo.png'} alt="DSU Logo" />
        </div>
      </div>
    </div>
  )
}

export default Header
