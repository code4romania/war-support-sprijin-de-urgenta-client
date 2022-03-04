import { AnyAction } from 'redux'
import { getCookie, removeCookie, setCookie } from '@/utils/cookies'
import endpoints from 'endpoints.json'
import i18n from 'i18next'

export enum ActionType {
  AUTHENTICATE = 'AUTHENTICATE',
  DEAUTHENTICATE = 'DEAUTHENTICATE',
  VERIFY_FAILED = 'VERIFY_FAILED',
}

export const initialState = {
  token: getCookie('token'),
  loading: true,
}

export const authenticate =
  ({ username, password }: { username: string; password: string }) =>
  (dispatch: any) =>
    fetch(
      `${process.env.NEXT_PUBLIC_PUBLIC_API}/${i18n.language}${endpoints['auth/login']}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      }
    )
      .then((response) =>
        response.json().then((data) => {
          const { access_token, user } = data
          if (access_token) {
            setCookie('token', access_token)
            dispatch({
              type: ActionType.AUTHENTICATE,
              payload: {
                token: access_token,
                userPk: user.pk,
              },
            })
            return data
          } else {
            return { errors: data }
          }
        })
      )
      .catch((err) => console.log(err))

export const reauthenticate = ({
  token,
  userPk,
}: {
  token: string
  userPk?: number
}) => {
  return (dispatch: any) => {
    dispatch({ type: ActionType.AUTHENTICATE, payload: { token, userPk } })
  }
}

export const verificationFailed = () => {
  return (dispatch: any) => {
    dispatch({ type: ActionType.VERIFY_FAILED })
  }
}

export const deauthenticate = () => {
  return (dispatch: any) => {
    removeCookie('token')
    dispatch({ type: ActionType.DEAUTHENTICATE })
  }
}

export const auth = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.AUTHENTICATE:
      const { token, userPk } = action.payload
      return { ...state, token, userPk, loading: false }
    case ActionType.DEAUTHENTICATE:
      return { token: null, userPk: null, loading: false }
    case ActionType.VERIFY_FAILED:
      return { ...state, loading: false }
    default:
      return state
  }
}

export default auth
