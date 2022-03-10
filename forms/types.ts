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


export enum TextileCategory {
  ClothingFemale = 1,
  ClothingMale = 2,
  ClothingChildren = 3,

  Blankets = 4,
  Sheets = 5,
  SleepingBags = 6,
  Other = 7
}