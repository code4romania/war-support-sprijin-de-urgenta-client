import { StepsStore } from 'store/reducers/steps/types'

export type State = {
  locale: string
  user?: any
  steps: StepsStore
}
