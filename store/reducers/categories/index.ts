import { AnyAction } from 'redux'
import i18n from 'i18next'

export const initialState = [
  {
    slug: 'services',
  },
  {
    slug: 'products',
  },
  {
    slug: 'volunteer',
  },
  {
    slug: 'others',
  },
  {
    slug: 'foodform',
    href: `${process.env.NEXT_PUBLIC_PUBLIC_API}/${i18n.language}/solicitari-mancare/`,
  },
]

export const categories = (state = initialState, action: AnyAction) => {
  return state
}
