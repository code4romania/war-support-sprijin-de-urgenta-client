import { useMemo } from 'react'
import { TransportServicesRequest } from 'api/types'
import clsx from 'clsx'
import {
  OfferTransportGoodsForm,
  RequestTransportGoodsForm,
  RequestTransportPersonsForm,
} from 'forms'
import { OfferTransportPersonsForm } from 'forms'
import React, { ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ResourcesForm, {
  ICategoryProps,
} from '@/components/ResourcesForm/ResourcesForm'
import { FormPageProps } from '../FormPage/FormPage'

interface ISignUpServicesFormProps {
  onAddItem: (data: TransportServicesRequest) => void
  type: FormPageProps.Offer | FormPageProps.Request
}

export const SignUpServicesForm = ({
  type,
  onAddItem,
}: ISignUpServicesFormProps) => {
  const { t } = useTranslation()

  const [showDialog, setShowDialog] = useState(false)

  const [servicesList, setServicesList] = useState<TransportServicesRequest[]>(
    []
  )

  const onAddService = (data: any) => {
    setServicesList((state) => [...state, data])
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
    return servicesList.map((item) => ({
      ...item,
      name: item.driver_name,
    }))
  }, [servicesList])

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
        updateTableItems={setServicesList}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </section>
  )
}
