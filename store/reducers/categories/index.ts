import { AnyAction } from 'redux'

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
  },
]

export const categories = (state = initialState, action: AnyAction) => {
  return state
}
