import { useProductsForm } from '@/hooks/useData'
import { DonateItemRequest } from 'api'
import React, { ReactNode, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  OfferBuildingMaterials,
  OfferGenericProduct,
  OfferProductsOthers,
  OfferTents,
  OfferTextileProduct,
} from 'forms'
import ResourcesForm from '@/components/ResourcesForm'
import clsx from 'clsx'
import { IResourcesCategoriesProps } from '../../forms/types'

export interface ISignUpProductsProps {
  defaultProp?: string
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

  const PRODUCTS: IResourcesCategoriesProps[] = [
    {
      resourceType: 'food',
      label: 'signup.products.food',
      children: (
        <OfferGenericProduct
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
        <OfferGenericProduct
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
        <OfferGenericProduct
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
        <OfferTextileProduct
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
        <OfferBuildingMaterials
          onSubmit={onProductAdd}
          counties={countyChoices}
        />
      ),
    },
    {
      resourceType: 'tents',
      label: 'signup.products.tents',
      children: (
        <OfferTents
          onSubmit={onProductAdd}
          counties={countyChoices}
          category={6}
        />
      ),
    },
    {
      resourceType: 'others',
      label: 'OfferProductsOthers',
      children: <OfferProductsOthers onSubmit={onProductAdd} />,
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
    <section
      className={clsx(
        'container grid place-items-start',
        'bg-blue-50 rounded',
        'px-8 py-7 w-full'
      )}
    >
      <h3 className="mb-8 text-xl font-semibold">{t('products')}</h3>
      <ResourcesForm
        categories={PRODUCTS}
        tableTitle={t('resources.added.products')}
        tableColumns={resourcesTableColumns}
        tableItems={productsList}
        updateTableItems={setProductsList}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </section>
  )
}

export default SignUpProducts
