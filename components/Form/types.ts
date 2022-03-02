import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { ErrorOption } from "react-hook-form";

export interface InputElementProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  errors?: ErrorOption;
}

export interface TextareaElementProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  errors?: ErrorOption;
}

export interface DropdownElementProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  errors?: ErrorOption;
  hideLabel?: boolean;
}

export interface GroupElementProps {
  label?: string;
  errors?: ErrorOption;
}
