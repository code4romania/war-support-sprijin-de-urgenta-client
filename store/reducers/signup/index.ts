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

export const userTypeForms: { [key: number]: any } = {
  [1]: {
    inputs: [
      { name: 'last_name', label: 'signup.userType.last_name' },
      { name: 'first_name', label: 'signup.userType.first_name' },
      { name: 'phone_number', label: 'signup.userType.phone_number' },
    ],
    schema: yup.object().shape({
      last_name: yup.string().required('Va rugam introduceti numele'),
      first_name: yup.string().required('Va rugam introduceti prenumele'),
      phone_number: yup
        .string()
        .required('Va rugam introduceti numarul de telefon'),
    }),
  },
  [2]: {
    inputs: [
      { name: 'business_name', label: 'signup.userType.business_name' },
      { name: 'identification_no', label: 'signup.userType.identification_no' },
    ],
    schema: yup.object().shape({
      business_name: yup
        .string()
        .required('Va rugam introduceti numele companiei'),
      identification_no: yup.string().required('Va rugam introduceti CUI/CIF'),
    }),
  },
  [3]: {
    inputs: [{ name: 'business_name', label: 'signup.userType.business_name' }],
    schema: yup.object().shape({
      business_name: yup.string().required('Va rugam introduceti numele companiei'),
    }),
  },
  [4]: {
    inputs: [{ name: 'business_name', label: 'signup.userType.business_name' }],
    schema: yup.object().shape({
      business_name: yup.string().required('Va rugam introduceti numele companiei'),
    }),
  },
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
