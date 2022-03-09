import { AnyAction } from 'redux'

export type LanguageCode = 'en' | 'ro' | 'uk' | 'ru'

// Reducer
export const locale = (state = 'ro', action: AnyAction) => {
  switch (action.type) {
    case 'SET_LOCALE':
      return action.payload.languageCode
    default:
      return state
  }
}

// Action creators
export const setLocale = (languageCode: LanguageCode) => {
  return {
    type: 'SET_LOCALE',
    payload: {
      languageCode,
    },
  }
}
