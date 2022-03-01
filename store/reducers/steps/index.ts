import { StepsStore } from './types'

export enum ActionType {
  INCREASE = 'increase',
  DECREASE = 'decrease',
}

type Action = { type: ActionType.DECREASE } | { type: ActionType.INCREASE }

export const defaultStepsState: StepsStore = {
  steps: [
    {
      label: 'steps.userType',
      component: 'UserType',
    },
    {
      label: 'steps.userData',
      component: 'UserData',
    },
    {
      label: 'steps.resources',
      component: 'Resources',
    },
  ],
  activeStep: 0,
}

export const steps = (
  state = defaultStepsState,
  action: Action
): StepsStore => {
  switch (action.type) {
    case ActionType.INCREASE: {
      if (state.activeStep + 1 > state.steps.length - 1) {
        return state
      }
      return {
        ...state,
        activeStep: state.activeStep + 1,
      }
    }
    case ActionType.DECREASE: {
      if (state.activeStep - 1 < 0) {
        return state
      }
      return {
        ...state,
        activeStep: state.activeStep - 1,
      }
    }
    default:
      return state
  }
}
