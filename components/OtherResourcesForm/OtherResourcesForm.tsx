import React, { useMemo, useState } from 'react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useData, useOthersForm } from '@/hooks/useData'
import endpoints from 'endpoints.json'
import { OfferOthersForm, RequestOthersForm } from 'forms'
import ResourcesForm from '@/components/ResourcesForm'
import { DonateOtherRequest } from 'api'
import { FormPageProps } from '../FormPage/FormPage'
import { useSelector } from 'react-redux'
import { State } from '@/store/types/state.type'

export type OtherResourceForm = {
  county_coverage: string
  town?: string
  name: string
  description?: string
  available_until?: string
}

interface IOtherResourceFormProps {
  items: DonateOtherRequest[]
  onAddItem: (data: DonateOtherRequest) => void
  type: FormPageProps
  onRemoveItem: (index: number) => void
}

const OtherResourcesForm = ({
  type,
  items,
  onAddItem,
  onRemoveItem,
}: IOtherResourceFormProps) => {
  const { t } = useTranslation()
  const token: string = useSelector((state: State) => state.auth.token)
  const { data: formData } = useOthersForm(FormPageProps.Offer, token)
  const { data: otherCategoriesList } = useData(endpoints['categories/other'])

  const categoriesList = otherCategoriesList?.map((category: any) => ({ name: t(category.name), ...category }));

  const tableColumns = [t('resources.other')]

  const [showDialog, setShowDialog] = useState(false)

  const handleDialogDismiss = () => {
    setShowDialog(false)
  }

  const onSubmit = (data: DonateOtherRequest) => {
    onAddItem(data)
    handleDialogDismiss()
  }

  const countyCoverage = useMemo(() => {
    return formData?.county_coverage?.choices.map((c: any) => ({
      value: c.value,
      label: c.display_name,
    }))
  }, [formData?.county_coverage?.choices])

  const categories =
    categoriesList?.map((category: { id: number; name: string }) => ({
      resourceType: category.id,
      label: category.name,
      children:
        type === FormPageProps.Offer ? (
          <OfferOthersForm
            counties={countyCoverage}
            onSubmit={onSubmit}
            category={category.id}
          />
        ) : (
          <RequestOthersForm
            counties={countyCoverage}
            onSubmit={onSubmit}
            category={category.id}
          />
        ),
    })) || []

  return (
    <section
      className={clsx(
        'container grid place-items-start gap-6',
        'bg-blue-50 rounded',
        'mx-auto px-8 py-7'
      )}
    >
      <h3 className="text-xl font-semibold">{`${t(
        'signup.other.header'
      )}:`}</h3>
      <ResourcesForm
        type={type}
        categories={categories}
        tableTitle={t('resources.added.other')}
        tableColumns={tableColumns}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        tableItems={items}
        onRemoveItem={onRemoveItem}
      />
    </section>
  )
}

export default OtherResourcesForm
