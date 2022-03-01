import { AnyAction } from "redux";

export enum UserType {
    none = "None",
    individual = "Individual",
    legalPerson = "Legal Person",
    publicAuthority = "Public Authority",
    ngo = "NGO"
}

export const userTypeOptions = [
    UserType.individual,
    UserType.legalPerson,
    UserType.publicAuthority,
    UserType.ngo
]

export const userType = (state = UserType.none, action: AnyAction) => {
    switch(action.type) {
      case 'SET_USER_TYPE':
        return action.payload.userType
      default:
        return state;
    }
}

export const setUserType = (userType: UserType) => {
    return ({
      type: 'SET_USER_TYPE',
      payload: {
        userType,
      }
    });
  }



