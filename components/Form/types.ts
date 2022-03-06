import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react'
import { Control, ErrorOption } from 'react-hook-form'

export interface InputElementProps
  extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  errors?: ErrorOption | ErrorOption[]
  helpText?: string
}

export interface TextareaElementProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  label?: string
  errors?: ErrorOption
}

export interface DropdownElementProps
  extends InputHTMLAttributes<HTMLSelectElement> {
  name: string
  label?: string
  errors?: ErrorOption
  hideLabel?: boolean
  noValidations?: boolean
  placeholder?: string
}

export interface GroupElementProps {
  className?: string
  label?: string
  required?: boolean
  errors?: ErrorOption | ErrorOption[]
}

export interface MultiSelectOption {
  value: any
  label: string
  key?: string
  disabled?: boolean
}
export interface DropdownMultiSelectProps {
  name: string
  options: MultiSelectOption[]
  disabled?: boolean
  label?: string
  hideLabel?: boolean
  errors?: ErrorOption | ErrorOption[]
  required?: boolean,
  children?: ReactNode
  className?: string
  control: Control<any, any>
  labelPosition?: 'horizontal' | 'vertical'
}

export type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};