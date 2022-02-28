import '../styles/globals.css'
import { i18n } from './i18next.js'
import * as NextImage from 'next/image'

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
})

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  previewTabs: {
    'storybook/docs/panel': { index: -1 },
  },
  i18n,
  locale: 'ro',
  locales: {
    ro: {title: "RO", left: '🇷🇴'},
    en: {title: "EN", left: '🇬🇧'},
    ua: {title: "UA", left: '🇺🇦'}
  },
}
