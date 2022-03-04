import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import React, { ReactNode, useState } from 'react'

import Button from '../Button'
import Form from '@/components/SignUpProducts/Form'
import { useProductsForm } from '@/hooks/useData'
import { TransportServicesRequest } from 'api'
import Dialog from '../Dialog'
import Others from './Others'
import { TransportPersonsForm } from 'forms'
import GenericProduct from './GenericProduct'
import TextileProduct from './TextileProduct'
import BuildingMaterials from './BuildingMaterials'
import Tents from './Tents'

export interface ISignUpProductsProps {
  defaultProp?: string
}

export interface IProductsProps {
  resourceType: string
  label: string
  children: ReactNode
}

const PRODUCTS: IProductsProps[] = [
  {
    resourceType: 'food',
    label: 'signup.products.food',
    children: <GenericProduct resourceType="food" />,
  },
  {
    resourceType: 'generalHygiene',
    label: 'signup.products.generalHygiene',
    children: <GenericProduct resourceType="generalHygiene" />,
  },
  {
    resourceType: 'feminineHygiene',
    label: 'signup.products.feminineHygiene',
    children: <GenericProduct resourceType="feminineHygiene" />,
  },
  {
    resourceType: 'textile',
    label: 'signup.products.textile',
    children: <TextileProduct resourceType="textile" />,
  },
  {
    resourceType: 'buildingMaterials',
    label: 'signup.products.buildingMaterials',
    children: <BuildingMaterials resourceType="buildingMaterials" />,
  },
  {
    resourceType: 'tents',
    label: 'signup.products.tents',
    children: <Tents resourceType="tents" />,
  },
  {
    resourceType: 'others',
    label: 'Others',
    children: <Others />,
  },
]

const SignUpProducts = ({}: ISignUpProductsProps) => {
  const { t } = useTranslation()
  const { data } = useProductsForm()

  const [showDialog, setShowDialog] = useState(false)
  const [dialogProductResourceType, setDialogProductResourceType] =
    useState('others')

  const handleDialogDismiss = () => {
    setShowDialog(false)
  }

  const renderDialog = (resourceType: string) => {
    const { label, children } = PRODUCTS.find(
      (aProduct) => aProduct.resourceType === resourceType
    ) || {
      resourceType: 'others',
      label: 'Others',
      children: <Others />,
    }

    return (
      <Dialog
        key={`${resourceType}_${label}`}
        isOpen={showDialog}
        onDismiss={handleDialogDismiss}
      >
        {
          <>
            <Dialog.Header title={t(label)} onDismiss={handleDialogDismiss} />
            {children}
          </>
        }
      </Dialog>
    )
  }

  return (
    <main
      className={clsx(
        'container grid place-items-start',
        'bg-blue-50 rounded',
        'px-8 py-7 md:w-1/2'
      )}
    >
      {PRODUCTS.length > 0 &&
        PRODUCTS.map(
          ({ resourceType, label }: IProductsProps, index: number) => (
            <React.Fragment key={`${resourceType}_${label}_${index}`}>
              <div className="flex items-center gap-4 mb-8 w-full">
                <h3 className="min-w-fit flex-1">{t(label)}</h3>
                <Button
                  text={t('add')}
                  size="small"
                  className="flex-1"
                  variant="tertiary"
                  onClick={() => {
                    setShowDialog(true)
                    setDialogProductResourceType(resourceType)
                  }}
                />
              </div>
            </React.Fragment>
          )
        )}
      {!!dialogProductResourceType && renderDialog(dialogProductResourceType)}
    </main>
  )
}

export default SignUpProducts
