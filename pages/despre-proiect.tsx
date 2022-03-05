import { useTranslation } from 'react-i18next'

import Image from '@/components/Image'
import Spacer from '@/components/Spacer'
import SubHeader from '@/components/SubHeader'

const ImageItem = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="flex items-center justify-center flex-1 p-4 mb-4 h-[150px] sm:mb-0">
      <Image src={src} alt={alt} className="h-[100px]" />
    </div>
  )
}

const images = [
  { id: 1, src: '/code4romania.svg', alt: 'Code 4 Romania logo' },
  { id: 2, src: '/gov_ro.svg', alt: 'Romanian GOV Logo' },
  { id: 3, src: '/dsu_logo.svg', alt: 'DSU Logo' },
  { id: 4, src: '/iom_logo.png', alt: 'IOM Logo' },
  { id: 5, src: '/unhcr_logo.png', alt: 'UNHCR Logo' },
]

const AboutPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <SubHeader />
      <div className="layout">
        <Spacer size="3.75rem" />
        <p className="mb-4">{t('about.p1')}</p>
        <p>{t('about.p2')}</p>
        <Spacer size="4rem" />
        <div className="flex items-center gap-2 flex-col sm:flex-row">
          {images.map(({ id, src, alt }) => (
            <ImageItem key={id} src={src} alt={alt} />
          ))}
        </div>
        <Spacer size="3.75rem" />
      </div>
    </>
  )
}

export default AboutPage
