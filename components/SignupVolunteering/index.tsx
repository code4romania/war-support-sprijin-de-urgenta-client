import React, { useMemo, useState } from 'react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useData, useVolunteeringForm } from '@/hooks/useData'

import endpoints from 'endpoints.json'
import ResourcesForm from '@/components/ResourcesForm'
import { DonateVolunteeringRequest } from '../../api'
import { OfferVolunteeringForm, RequestVolunteeringForm } from 'forms'
import { FormPageProps } from '../FormPage/FormPage'

interface ISignupVolunteeringProps {
  items: DonateVolunteeringRequest[]
  onAddItem: (data: DonateVolunteeringRequest) => void
  type: FormPageProps.Offer | FormPageProps.Request
  onRemoveItem: (index: number) => void
}

const SignupVolunteering = ({
  type,
  items,
  onAddItem,
  onRemoveItem,
}: ISignupVolunteeringProps) => {
  const { t } = useTranslation()
  const { data: formData } = useVolunteeringForm()
  const { data: categoriesList } = useData(endpoints['categories/volunteering'])

  const tableColumns = [t('resources.volunteering')]

  const [showDialog, setShowDialog] = useState(false)

  const handleDialogDismiss = () => {
    setShowDialog(false)
  }

  const onSubmit = (data: DonateVolunteeringRequest) => {
    onAddItem(data)
    handleDialogDismiss()
  }

  const countyCovarage = useMemo(() => {
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
          <OfferVolunteeringForm
            counties={countyCovarage}
            onSubmit={onSubmit}
            category={category.id}
          />
        ) : (
          <RequestVolunteeringForm
            counties={countyCovarage}
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
        'signup.volunteering.header'
      )}:`}</h3>
      <ResourcesForm
        categories={categories}
        tableTitle={t('resources.volunteering.added')}
        tableColumns={tableColumns}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        tableItems={items}
        onRemoveItem={onRemoveItem}
      />
    </section>
  )
}

export default SignupVolunteering
