import { AnyAction } from 'redux'
import { getCookie, removeCookie, setCookie } from '@/utils/cookies'
import endpoints from 'endpoints.json'

export enum ActionType {
  AUTHENTICATE = 'AUTHENTICATE',
  DEAUTHENTICATE = 'DEAUTHENTICATE',
}

export const initialState = {
  token: getCookie('token'),
}

export const authenticate =
  ({ username, password }: { username: string; password: string }) =>
  (dispatch: any) =>
    // @ts-ignore
    fetch(process.env.NEXT_PUBLIC_PUBLIC_API + endpoints['auth/login'], {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) =>
        response.json().then((data) => {
          if (data.access_token) {
            setCookie('token', data.access_token)
            dispatch({
              type: ActionType.AUTHENTICATE,
              payload: data.access_token,
            })
            return data;
          } else {
            return { errors: data }
          }
        })
      )
      .catch((err) => console.log(err))

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
