import { State } from '@/store/types/state.type'
import { AnyAction } from 'redux'

export enum ActionType {
  SET_USER_TYPE = 'SET_USER_TYPE',
  SET_DEFAULT_OFFER = 'SET_DEFAULT_OFFER',
}

export enum UserType {
  none = 'None',
  individual = 'Individual',
  legalPerson = 'Legal Person',
  publicAuthority = 'Public Authority',
  ngo = 'NGO',
}

export const userTypeOptions = [
  UserType.individual,
  UserType.legalPerson,
  UserType.publicAuthority,
  UserType.ngo,
]

export const userType = (state = UserType.none, action: AnyAction) => {
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

// Reducer
export const defaultOffer = (state = 1, action: AnyAction) => {
  switch (action.type) {
    case ActionType.SET_DEFAULT_OFFER:
      return action.payload.id
    default:
      return state
  }
}

// Action creators
export const setDefaultOffer = (id: number) => {
  return {
    type: ActionType.SET_DEFAULT_OFFER,
    payload: {
      id,
    },
  }
}
