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
  RequestBuildingMaterials,
  RequestGenericProduct,
  RequestTents,
  RequestTextileProduct,
} from 'forms'
import ResourcesForm from '@/components/ResourcesForm'
import clsx from 'clsx'
import { IResourcesCategoriesProps } from '../../forms/types'
import { FormPageProps } from '../FormPage/FormPage'

export interface ISignUpProductsProps {
  items: DonateItemRequest[]
  onAddItem: (item: DonateItemRequest) => void
  type: FormPageProps.Offer | FormPageProps.Request
  onRemoveItem: (index: number) => void
}
export interface IProductsProps {
  resourceType: string
  label: string
  children: ReactNode
}

const SignUpProducts = ({
  type,
  onAddItem,
  items,
  onRemoveItem,
}: ISignUpProductsProps) => {
  const { t } = useTranslation()
  const { data } = useProductsForm()

  const [showDialog, setShowDialog] = useState(false)

  const onProductAdd = (data: DonateItemRequest) => {
    handleDialogDismiss()
    onAddItem(data)
  }

  const countyChoices = useMemo(() => {
    return data?.county_coverage?.choices.map((c: any) => ({
      value: c.value,
      label: c.display_name,
    }))
  }, [data?.county_coverage?.choices])

  const categories: IResourcesCategoriesProps[] = [
    {
      resourceType: 'food',
      label: 'signup.products.food',
      children:
        type === FormPageProps.Offer ? (
          <OfferGenericProduct
            onSubmit={onProductAdd}
            counties={countyChoices}
            category={1}
          />
        ) : (
          <RequestGenericProduct
            onSubmit={onProductAdd}
            counties={countyChoices}
            category={1}
          />
        ),
    },
    {
      resourceType: 'generalHygiene',
      label: 'signup.products.generalHygiene',
      children:
        type === FormPageProps.Offer ? (
          <OfferGenericProduct
            onSubmit={onProductAdd}
            counties={countyChoices}
            category={1}
          />
        ) : (
          <RequestGenericProduct
            onSubmit={onProductAdd}
            counties={countyChoices}
            category={1}
          />
        ),
    },
    {
      resourceType: 'feminineHygiene',
      label: 'signup.products.feminineHygiene',
      children:
        type === FormPageProps.Offer ? (
          <OfferGenericProduct
            onSubmit={onProductAdd}
            counties={countyChoices}
            category={1}
          />
        ) : (
          <RequestGenericProduct
            onSubmit={onProductAdd}
            counties={countyChoices}
            category={1}
          />
        ),
    },
    {
      resourceType: 'textile',
      label: 'signup.products.textile',
      children:
        type === FormPageProps.Offer ? (
          <OfferTextileProduct
            onSubmit={onProductAdd}
            resourceType="textile"
            counties={countyChoices}
          />
        ) : (
          <RequestTextileProduct
            onSubmit={onProductAdd}
            resourceType="textile"
            counties={countyChoices}
          />
        ),
    },
    {
      resourceType: 'buildingMaterials',
      label: 'signup.products.buildingMaterials',
      children:
        type === FormPageProps.Offer ? (
          <OfferBuildingMaterials
            onSubmit={onProductAdd}
            counties={countyChoices}
          />
        ) : (
          <RequestBuildingMaterials
            onSubmit={onProductAdd}
            counties={countyChoices}
          />
        ),
    },
    {
      resourceType: 'tents',
      label: 'signup.products.tents',
      children:
        type === FormPageProps.Offer ? (
          <OfferTents
            onSubmit={onProductAdd}
            counties={countyChoices}
            category={6}
          />
        ) : (
          <RequestTents
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
        categories={categories}
        tableTitle={t('resources.added.products')}
        tableColumns={resourcesTableColumns}
        tableItems={items}
        onRemoveItem={onRemoveItem}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </section>
  )
}

export default SignUpProducts
