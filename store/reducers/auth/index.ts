import { AnyAction } from 'redux'
import { removeCookie } from '@/utils/cookies'

export enum ActionType {
  AUTHENTICATE = 'AUTHENTICATE',
  DEAUTHENTICATE = 'DEAUTHENTICATE',
}

export const initialState = {
  token: null,
}

export const reauthenticate = (token: string) => {
  return (dispatch: any) => {
    dispatch({ type: ActionType.AUTHENTICATE, payload: token })
  }
}

export const deauthenticate = () => {
  return (dispatch: any) => {
    removeCookie('token')
    // Router.push('/')
    dispatch({ type: ActionType.DEAUTHENTICATE })
  }
}

export const auth = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.AUTHENTICATE:
      return { ...state, token: action.payload }
    case ActionType.DEAUTHENTICATE:
      return { token: null }
    default:
      return state
  }
}

export default auth
