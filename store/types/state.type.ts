import { StepsStore } from '@/store/reducers/steps/types'
import { ICategory } from '@/store/reducers/categories/types';

export type State = {
  locale: string
  user?: any
  steps: StepsStore
  defaultOffer?: string
  categories: ICategory[]
}
