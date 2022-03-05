import { phoneNumberRegex } from '@/utils/regexes';
import { AnyAction } from 'redux'
import * as yup from 'yup'

export enum ActionType {
  SET_USER_TYPE = 'SET_USER_TYPE',
  SET_SIGNUP_DATA = 'SET_SIGNUP_DATA',
  SET_DEFAULT_OFFER = 'SET_DEFAULT_OFFER',
}

export interface UserType {
  value: number,
  display_name: string,
}

export const userType = (state = '', action: AnyAction) => {
  switch (action.type) {
    case ActionType.SET_USER_TYPE:
      return action.payload.userType
    default:
      return state
  }
}

export const setUserType = (userType: UserType) => {
  return {
    type: ActionType.SET_USER_TYPE,
    payload: {
      userType,
    },
  }
}

export const setSignupData = (userData: any) => {
  return {
    type: ActionType.SET_SIGNUP_DATA,
    payload: {
      userData,
    },
  }
}

// Reducer
export const signup = (state = '', action: AnyAction) => {
  switch (action.type) {
    case ActionType.SET_DEFAULT_OFFER:
      return action.payload.id
    case ActionType.SET_SIGNUP_DATA:
      return action.payload
    default:
      return state
  }
}

// Action creators
export const setDefaultOffer = (id: string) => {
  return {
    type: ActionType.SET_DEFAULT_OFFER,
    payload: {
      id,
    },
  }
}
