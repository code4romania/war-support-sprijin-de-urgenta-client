import React, { useMemo, useState } from 'react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useData, useVolunteeringForm } from '@/hooks/useData'

import endpoints from 'endpoints.json'
import ResourcesForm from '@/components/ResourcesForm'
import { DonateVolunteeringRequest } from '../../api'
import { OfferVolunteeringForm, RequestVolunteeringForm } from 'forms'
import { FormPageProps } from '../FormPage/FormPage'
import { useSelector } from 'react-redux'
import { State } from '@/store/types/state.type'

interface ISignupVolunteeringProps {
  items: DonateVolunteeringRequest[]
  onAddItem: (data: DonateVolunteeringRequest) => void
  type: FormPageProps
  onRemoveItem: (index: number) => void
}

const SignupVolunteering = ({
  type,
  items,
  onAddItem,
  onRemoveItem,
}: ISignupVolunteeringProps) => {
  const { t } = useTranslation()
  const token: string = useSelector((state: State) => state.auth.token)

  const { data: formData } = useVolunteeringForm(FormPageProps.Offer, token)
  const { data: volunteeringCategoriesList } = useData(endpoints['categories/volunteering'])
  
  const categoriesList = volunteeringCategoriesList?.map((category: any) => ({ name: t(category.name), ...category }));

  const tableColumns = [t('resources.volunteering')]

  const [showDialog, setShowDialog] = useState(false)

  const handleDialogDismiss = () => {
    setShowDialog(false)
  }

  const onSubmit = (data: DonateVolunteeringRequest) => {
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
          <OfferVolunteeringForm
            counties={countyCoverage}
            onSubmit={onSubmit}
            category={category.id}
          />
        ) : (
          <RequestVolunteeringForm
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
        'signup.volunteering.header'
      )}:`}</h3>
      <ResourcesForm
        type={type}
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
