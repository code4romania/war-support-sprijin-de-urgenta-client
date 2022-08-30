import { AnyAction } from 'redux'

export const initialState = [
  {
    locale: 'ro',
    href: '/ro/solicitari-mancare/',
  },
  {
    locale: 'en',
    href: '/en/solicitari-mancare/',
  },
  {
    locale: 'uk',
    href: '/uk/solicitari-mancare/',
  },
  {
    locale: 'ru',
    href: '/ru/solicitari-mancare/',
  },
]

export const foodform = (state = initialState, action: AnyAction) => {
  return state
}
