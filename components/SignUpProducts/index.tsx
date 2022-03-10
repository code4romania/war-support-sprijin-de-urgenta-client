import ResourcesForm from '@/components/ResourcesForm'
import { useProductsForm } from '@/hooks/useData'
import { State } from '@/store/types/state.type'
import { ItemRequestUnion } from 'api'
import clsx from 'clsx'
import {
  OfferBuildingMaterials,
  OfferGenericProduct,
  OfferProductsOthers,
  OfferTents,
  OfferTextileProduct,
  RequestBuildingMaterials,
  RequestGenericProduct,
  RequestOthers,
  RequestTents,
  RequestTextileProduct
} from "forms";
import { ReactNode, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { IResourcesCategoriesProps } from '../../forms/types'
import { FormPageProps } from '../FormPage/FormPage'

export interface ISignUpProductsProps {
  items: ItemRequestUnion[]
  onAddItem: (item: ItemRequestUnion) => void
  type: FormPageProps
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
  const token: string = useSelector((state: State) => state.auth.token)
  const { data } = useProductsForm(FormPageProps.Offer, token)

  const [showDialog, setShowDialog] = useState(false)

  const onProductAdd = (
    data: ItemRequestUnion
  ) => {
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
            category={2}
          />
        ) : (
          <RequestGenericProduct
            onSubmit={onProductAdd}
            counties={countyChoices}
            category={2}
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
            category={3}
          />
        ) : (
          <RequestGenericProduct
            onSubmit={onProductAdd}
            counties={countyChoices}
            category={3}
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
            category={4}
          />
        ) : (
          <RequestTextileProduct
            onSubmit={onProductAdd}
            category={4}
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
            category={5}
          />
        ) : (
          <RequestBuildingMaterials
            onSubmit={onProductAdd}
            counties={countyChoices}
            category={5}
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
      label: 'signup.products.others',
      children:
        type === FormPageProps.Offer ? (
          <OfferProductsOthers
            onSubmit={onProductAdd}
            counties={countyChoices}
            category={7}
          />
        ) : (
          <RequestOthers
            onSubmit={onProductAdd}
            counties={countyChoices}
            category={7}
          />
        ),
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
        type={type}
        categories={categories}
        tableTitle={t('resources.added.products')}
        tableColumns={resourcesTableColumns}
        tableItems={items.map(item => {
          if (item.kind === 'noName')
            return { ...item, name: item.unit_type === 'tent' ? t('signup.products.tents') : t('signup.products.textile') }
          else
            return item;
        })}
        onRemoveItem={onRemoveItem}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </section>
  )
}

export default SignUpProducts
