import { ReactNode } from 'react'

export interface Step {
  component: ReactNode
  label: string
}

export interface StepsStore {
  steps: Step[]
  activeStep: number
}
