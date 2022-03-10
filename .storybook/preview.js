import '../styles/globals.css'
import * as NextImage from 'next/image'
import { Provider } from 'react-redux'
import { i18n } from './i18next.js'
import { initStore } from '../store'

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
})
const store = initStore()

const withStore = (story) => <Provider store={store}>{story()}</Provider>

export const decorators = [withStore]

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
    ro: { title: 'RO', left: '🇷🇴' },
    en: { title: 'EN', left: '🇬🇧' },
    uk: { title: 'UK', left: '🇺k' },
    ru: { title: 'RU', left: 'RU' },
  },
}
