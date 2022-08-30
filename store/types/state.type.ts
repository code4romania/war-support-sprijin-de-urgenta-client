import { StepsStore } from '@/store/reducers/steps/types'
import { ICategory } from '@/store/reducers/categories/types'
import { IFoodForm } from '@/store/reducers/foodform/types'

export type State = {
  locale: string
  user?: any
  steps: StepsStore
  defaultOffer?: string
  categories: ICategory[]
  foodform: IFoodForm[]
  signup: any
  auth: any
}
