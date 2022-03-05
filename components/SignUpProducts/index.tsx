import { useProductsForm } from '@/hooks/useData'
import { DonateItemRequest } from 'api'
import clsx from 'clsx'
import React, { ReactNode, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../Button'
import Dialog from '../Dialog'
import ResourcesTableList from '../ResourcesTableList'
import BuildingMaterials from './BuildingMaterials'
import GenericProduct from './GenericProduct'
import Others from './Others'
import Tents from './Tents'
import TextileProduct from './TextileProduct'

export interface ISignUpProductsProps {
  defaultProp?: string
}

export interface IProductsProps {
  resourceType: string
  label: string
  children: ReactNode
}

const SignUpProducts = ({ }: ISignUpProductsProps) => {
  const { t } = useTranslation()
  const { data } = useProductsForm()

  const [showDialog, setShowDialog] = useState(false)
  const [dialogProductResourceType, setDialogProductResourceType] = useState('others')
  const [productsList, setProductsList] = useState<DonateItemRequest[]>([]);

  //TODO: Find a way to map the categories with corresponding components..

  const onProductAdd = (data: DonateItemRequest) => {
    setProductsList((state) => [...state, data])
    handleDialogDismiss();
  }

  const countyChoices = useMemo(() => {
    return data?.county_coverage?.choices.map((c: any) => ({
      value: c.value,
      label: c.display_name,
    }))
  }, [data?.county_coverage?.choices])

  const PRODUCTS: IProductsProps[] = [
    {
      resourceType: 'food',
      label: 'signup.products.food',
      children: (
        <GenericProduct
          onSubmit={onProductAdd}
          resourceType="food"
          counties={countyChoices}
          category={1}
        />
      ),
    },
    {
      resourceType: 'generalHygiene',
      label: 'signup.products.generalHygiene',
      children: (
        <GenericProduct
          onSubmit={onProductAdd}
          resourceType="generalHygiene"
          counties={countyChoices}
          category={2}
        />
      ),
    },
    {
      resourceType: 'feminineHygiene',
      label: 'signup.products.feminineHygiene',
      children: (
        <GenericProduct
          onSubmit={onProductAdd}
          resourceType="feminineHygiene"
          counties={countyChoices}
          category={3}
        />
      ),
    },
    {
      resourceType: 'textile',
      label: 'signup.products.textile',
      children: (
        <TextileProduct
          onSubmit={onProductAdd}
          resourceType="textile"
          counties={countyChoices}
        />
      ),
    },
    {
      resourceType: 'buildingMaterials',
      label: 'signup.products.buildingMaterials',
      children: (
        <BuildingMaterials
          onSubmit={onProductAdd}
          resourceType="buildingMaterials"
          counties={countyChoices}
        />
      ),
    },
    {
      resourceType: 'tents',
      label: 'signup.products.tents',
      children: <Tents
        onSubmit={onProductAdd}
        counties={countyChoices}
        category={6} />,
    },
    {
      resourceType: 'others',
      label: 'Others',
      children: <Others resourceType={'others'} onSubmit={onProductAdd} />,
    },
  ]

  const handleDialogDismiss = () => {
    setShowDialog(false)
  }

  const renderDialog = (resourceType: string) => {
    const { label, children } = PRODUCTS.find(
      (aProduct) => aProduct.resourceType === resourceType
    ) || {
      resourceType: 'others',
      label: 'Others',
      children: <Others resourceType={'others'} onSubmit={onProductAdd} />,
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

  const resourcesTableColumns = [
    t('resources.product'),
    t('resources.quantity'),
  ]

  const onProductRemoved = (itemId: string) => {
    const index = productsList.findIndex((p) => p.name === itemId)
    if (index > -1) {
      productsList.splice(index, 1)
      setProductsList(productsList)
    }
  }

  return (
    <main
      className={clsx(
        'container grid place-items-start',
        'bg-blue-50 rounded',
        'px-8 py-7 w-full'
      )}
    >
      <section className={clsx('flex flex-col md:flex-row w-full')}>
        <div className="w-full md:w-1/2">
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
        </div>
        <ResourcesTableList
          className="w-full md:w-1/2 ml-0 md:ml-4"
          title={t('resources.added.products')}
          columns={resourcesTableColumns}
          list={productsList.map(t => ({
            id: t.name, name: t.name,
            quantity: t.quantity,
            um: t.unit_type
          }))}
          onItemRemoved={onProductRemoved} />
        {!!dialogProductResourceType && renderDialog(dialogProductResourceType)}
      </section>
    </main>
  )
}

export default SignUpProducts
