import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

const ns = ['common']
const supportedLngs = ['en', 'ro', 'ua']

i18n
  .use(initReactI18next)
  .init({
    //debug: true,
    lng: 'ro',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'common',
    ns,
    supportedLngs,
  })

supportedLngs.forEach((lang) => {
  ns.forEach((n) => {
    i18n.addResourceBundle(
      lang,
      n,
      require(`../public/locales/${lang}/${n}.json`)
    )
  })
})

export { i18n }
