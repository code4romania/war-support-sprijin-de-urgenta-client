import { AnyAction } from 'redux'

export const initialState = [
  {
    locale: 'ro',
    href: '/ro/solicitari-mancare/',
  },
  {
    locale: 'en',
    href: '/en/food-requests/',
  },
  {
    locale: 'uk',
    href: '/en/food-requests/',
  },
  {
    locale: 'ru',
    href: '/en/food-requests/',
  },
]

export const foodform = (state = initialState, action: AnyAction) => {
  return state
}
