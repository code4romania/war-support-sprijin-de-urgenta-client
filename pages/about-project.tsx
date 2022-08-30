import { useTranslation } from 'react-i18next'

import Image from '@/components/Image'
import Spacer from '@/components/Spacer'
import SubHeader from '@/components/SubHeader'
import Code4Romania from '../public/code4romania.svg'
import GovRo from '../public/gov_ro.png'
import DsuLogo from '../public/DSU_logo.png'
import IomLogo from '../public/iom_logo.svg'
import UnhcrLogo from '../public/unhcr_logo.svg'

const ImageItem = ({
  src,
  alt,
  width,
  height,
}: {
  src: string
  alt: string
  width?: number
  height?: number
}) => {
  return (
    <div className="flex items-center justify-center flex-1 px-6 mb-4 sm:mb-0">
      <Image
        src={src}
        alt={alt}
        className="flex-1"
        width={width}
        height={height}
      />
    </div>
  )
}

const images = [
  {
    id: 1,
    src: Code4Romania,
    alt: 'Code 4 Romania logo',
    width: 270,
    height: 100,
  },
  { id: 2, src: GovRo, alt: 'Romanian GOV Logo', width: 270, height: 100 },
  { id: 3, src: DsuLogo, alt: 'DSU Logo', width: 270, height: 100 },
  { id: 4, src: IomLogo, alt: 'IOM Logo', width: 270, height: 100 },
  { id: 5, src: UnhcrLogo, alt: 'UNHCR Logo', width: 270, height: 100 },
]

const AboutPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <SubHeader />
      <div className="layout">
        <Spacer size="3.5rem" />
        <h1 className="text-3xl font-bold leading-normal md:max-w-[30ch]">
          {t('about.project')}
        </h1>
        <Spacer size="3.5rem" />
        <p className="mb-4">{t('about.p1')}</p>
        <p>{t('about.p2')}</p>
        <Spacer size="4rem" />
        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-2">
          {images.map(({ id, src, alt, width, height }) => (
            <ImageItem
              key={id}
              src={src}
              alt={alt}
              width={width}
              height={height}
            />
          ))}
        </div>
        <Spacer size="3.75rem" />
      </div>
    </>
  )
}

export default AboutPage
