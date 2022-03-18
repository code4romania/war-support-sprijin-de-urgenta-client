import React from 'react'
import PhoneInput from 'react-phone-input-2'
import { Controller } from 'react-hook-form'
import 'react-phone-input-2/lib/style.css'
import { Label, Required } from '@/components/Form/common'

const TelInput = ({ control, label, name, required, schema }: any) => {
  let validPhoneNumber = false
  const validatePhoneNumber = (
    inputNumber: string,
    country: any,
    isDirty: boolean,
    phoneLength: number
  ) => {
    if (isDirty) {
      if (
        inputNumber &&
        inputNumber?.replace(country.dialCode, '')?.trim() === ''
      ) {
        validPhoneNumber = false
        return false
      } else if (inputNumber.length < phoneLength) {
        validPhoneNumber = false
        return false
      }
      validPhoneNumber = true
      return true
    }
    validPhoneNumber = false
    return false
  }
  return (
    <div className={'pb-5'}>
      {label && (
        <Label name={name} className={'mb-1'}>
          {label}
          {required && <Required />}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        render={(props) => {
          return (
            <PhoneInput
              onChange={(e) => {
                props.field.onChange(e)
              }}
              inputProps={{
                id: name,
                name,
                required,
                autoComplete: 'none',
              }}
              country={'ro'}
              regions={'europe'}
              inputStyle={{ width: '100%', marginTop: '4px', height:'2.5rem', fontSize: '16px' }}
              buttonClass={'absolute top-0 bottom-0 border-1'}
              value={props.field.value}
              isValid={(inputNumber, country: any, countries) => {
                const phoneLength = Math.ceil(
                  (
                    countries.filter(
                      (val: any) => val.dialCode === country.dialCode
                    )[0] as any
                  )?.format.length / 2
                )
                return validatePhoneNumber(
                  inputNumber,
                  country,
                  props.formState.isDirty,
                  phoneLength
                )
              }}
              specialLabel=""
            />
          )
        }}
        rules={{
          required,
          validate: () => validPhoneNumber || schema?.errorMessage?.validate,
        }}
      />
    </div>
  )
}

export default TelInput
