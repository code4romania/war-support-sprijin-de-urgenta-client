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
    { name: 'name', label: 'Nume' },
    { name: 'phone', label: 'Telefon' },
    { name: 'email', label: 'Email' },
  ],
  [UserType.legalPerson]: [
    { name: 'name', label: 'Denumire *' },
    { name: 'id', label: 'CUI/CIF *' },
  ],
  [UserType.publicAuthority]: [{ name: 'name', label: 'Denumire *' }],
  [UserType.ngo]: [{ name: 'name', label: 'Denumire *' }],
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
