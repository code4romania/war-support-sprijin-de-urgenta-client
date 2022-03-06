import { ReactNode } from 'react'

export type ResourceType =
  | 'food'
  | 'textile'
  | 'generalHygiene'
  | 'feminineHygiene'
  | 'buildingMaterials'
  | 'tents'
  | 'others'

export interface County {
  display_name: string
  value: string
}

export interface IResourcesCategoriesProps {
  resourceType: string
  label: string
  children: ReactNode
}

export type City = string
