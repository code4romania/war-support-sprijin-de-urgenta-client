import { useProductsForm } from '@/hooks/useData'
import { DonateItemRequest } from 'api'
import React, { ReactNode, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import BuildingMaterials from './BuildingMaterials'
import GenericProduct from './GenericProduct'
import Others from './Others'
import Tents from './Tents'
import TextileProduct from './TextileProduct'
import ResourcesForm from '@/components/ResourcesForm'

export interface ISignUpProductsProps {
  defaultProp?: string
}

export interface IProductsProps {
  resourceType: string
  label: string
  children: ReactNode
}

const SignUpProducts = ({}: ISignUpProductsProps) => {
  const { t } = useTranslation()
  const { data } = useProductsForm()

  const [showDialog, setShowDialog] = useState(false)
  const [productsList, setProductsList] = useState<DonateItemRequest[]>([])

  const onProductAdd = (data: DonateItemRequest) => {
    setProductsList((state) => [...state, data])
    handleDialogDismiss()
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
        <BuildingMaterials onSubmit={onProductAdd} counties={countyChoices} />
      ),
    },
    {
      resourceType: 'tents',
      label: 'signup.products.tents',
      children: (
        <Tents onSubmit={onProductAdd} counties={countyChoices} category={6} />
      ),
    },
    {
      resourceType: 'others',
      label: 'Others',
      children: <Others onSubmit={onProductAdd} />,
    },
  ]

  const handleDialogDismiss = () => {
    setShowDialog(false)
  }

  const resourcesTableColumns = [
    t('resources.product'),
    t('resources.quantity'),
  ]

  return (
    <ResourcesForm
      categories={PRODUCTS}
      tableTitle={t('resources.added.products')}
      tableColumns={resourcesTableColumns}
      tableItems={productsList}
      updateTableItems={setProductsList}
      showDialog={showDialog}
      setShowDialog={setShowDialog}
    />
  )
}

export default SignUpProducts
