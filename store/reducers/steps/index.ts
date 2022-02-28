import { StepsStore } from './types'
import { useTranslation } from 'react-i18next'

export enum ActionType {
  INCREASE = 'increase',
  DECREASE = 'decrease',
}

type Action = { type: ActionType.DECREASE } | { type: ActionType.INCREASE }

export const defaultStepsState: StepsStore = {
  steps: [
    {
      label: 'steps.userType',
      component: 'TipUtilizator',
    },
    {
      label: 'steps.userData',
      component: 'DateUtilizator',
    },
    {
      label: 'steps.resources',
      component: 'ResurseOferite',
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
