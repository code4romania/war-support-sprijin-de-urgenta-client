import { useMemo } from 'react'
import { TransportServicesRequest } from 'api/types'
import clsx from 'clsx'
import {
  OfferTransportGoodsForm,
  RequestTransportGoodsForm,
  RequestTransportPersonsForm,
  OfferTransportPersonsForm,
} from 'forms'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ResourcesForm, {
  ICategoryProps,
} from '@/components/ResourcesForm/ResourcesForm'
import { FormPageProps } from '../FormPage/FormPage'

interface ISignUpServicesFormProps {
  items: TransportServicesRequest[]
  onAddItem: (data: TransportServicesRequest) => void
  type: FormPageProps.Offer | FormPageProps.Request
  onRemoveItem: (index: number) => void
}

export const SignUpServicesForm = ({
  type,
  items,
  onAddItem,
  onRemoveItem,
}: ISignUpServicesFormProps) => {
  const { t } = useTranslation()

  const [showDialog, setShowDialog] = useState(false)

  const onAddService = (data: any) => {
    onAddItem(data)
    setShowDialog(false)
  }

  const categories: ICategoryProps[] = [
    {
      resourceType: 'goods',
      label: t('services.transport-goods'),
      children:
        type === FormPageProps.Offer ? (
          <OfferTransportGoodsForm onSubmit={onAddService} />
        ) : (
          <RequestTransportGoodsForm onSubmit={onAddService} />
        ),
    },
    {
      resourceType: 'people',
      label: t('services.transport-people'),
      children:
        type === FormPageProps.Offer ? (
          <OfferTransportPersonsForm onSubmit={onAddService} />
        ) : (
          <RequestTransportPersonsForm onSubmit={onAddService} />
        ),
    },
  ]

  const resourcesTableColumns = [t('services.driver-name')]
  const tableItems = useMemo(() => {
    return items.map((item) => ({
      ...item,
      name: item.driver_name,
    }))
  }, [items])

  return (
    <section
      className={clsx(
        'container grid place-items-start',
        'bg-blue-50 rounded',
        'px-8 py-7 w-full'
      )}
    >
      <h3 className="mb-8 text-xl font-semibold">{t('services')}</h3>
      <ResourcesForm
        categories={categories}
        tableTitle={t('resources.services.added')}
        tableColumns={resourcesTableColumns}
        tableItems={tableItems}
        onRemoveItem={onRemoveItem}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </section>
  )
}
