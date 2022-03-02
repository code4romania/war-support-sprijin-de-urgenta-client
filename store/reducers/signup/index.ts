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

export const userTypeForms = {
  [UserType.individual]: [
    { name: 'last_name', label: 'signup.userType.last_name' },
    { name: 'first_name', label: 'signup.userType.first_name' },
    { name: 'phone_number', label: 'signup.userType.phone_number' },
  ],
  [UserType.legalPerson]: [
    { name: 'business_name', label: 'signup.userType.business_name' },
    { name: 'identification_no', label: 'signup.userType.identification_no' },
  ],
  [UserType.publicAuthority]: [
    { name: 'business_name', label: 'signup.userType.business_name' },
  ],
  [UserType.ngo]: [
    { name: 'business_name', label: 'signup.userType.business_name' },
  ],
}

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
export const defaultOffer = (state = '', action: AnyAction) => {
  switch (action.type) {
    case ActionType.SET_DEFAULT_OFFER:
      return action.payload.id
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
