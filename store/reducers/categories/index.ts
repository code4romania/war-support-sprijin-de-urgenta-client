import { AnyAction } from 'redux'

export const initialState = [
  {
    slug: 'services',
  },
  {
    slug: 'products',
  },
  {
    slug: 'signup.volunteering.header',
  },
  {
    slug: 'others',
  }
]

export const categories = (state = initialState, action: AnyAction) => {
  return state
}
