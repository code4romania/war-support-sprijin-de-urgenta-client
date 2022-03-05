export type ResourceType =
  | 'food'
  | 'textile'
  | 'generalHygiene'
  | 'feminineHygiene'
  | 'buildingMaterials'
  | 'tents'

export interface County {
  display_name: string
  value: string
}

export type City = string
