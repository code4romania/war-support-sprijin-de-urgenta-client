export enum UserComponentType {
  userType = 'User Type',
  userData = 'User Data',
  userResources = 'User Resources'
}

export interface Step {
  component: UserComponentType
  label: string
}

export interface StepsStore {
  steps: Step[]
  activeStep: number
}
