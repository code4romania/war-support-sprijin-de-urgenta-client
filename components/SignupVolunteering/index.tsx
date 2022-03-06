import React, { FC, useMemo, useState } from 'react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useData, useVolunteeringForm } from '@/hooks/useData'

import endpoints from 'endpoints.json'
import ResourcesForm from '@/components/ResourcesForm'
import { DonateVolunteeringRequest } from '../../api'
import { OfferVolunteeringForm } from 'forms'

const SignupVolunteering: FC = () => {
  const { t } = useTranslation()
  const { data: formData } = useVolunteeringForm()
  const { data: categoriesList } = useData(endpoints['categories/volunteering'])

  const tableColumns = [t('resources.volunteering')]

  const [showDialog, setShowDialog] = useState(false)
  const [productsList, setProductsList] = useState<DonateVolunteeringRequest[]>(
    []
  )

  const handleDialogDismiss = () => {
    setShowDialog(false)
  }

  const onAddItem = (data: DonateVolunteeringRequest) => {
    setProductsList((state) => [...state, data])
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
      children: (
        <OfferVolunteeringForm
          counties={countyCovarage}
          onSubmit={onAddItem}
          category={category.id}
        />
      ),
    })) || []
  //
  // const onSubmit = async (values: any) => {
  //   fetch(
  //     `${process.env.NEXT_PUBLIC_PUBLIC_API}/${i18n.language}${endpoints['donate/volunteering']}`,
  //     {
  //       method: 'POST',
  //       mode: 'cors',
  //       cache: 'no-cache',
  //       credentials: 'same-origin',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       redirect: 'follow',
  //       referrerPolicy: 'no-referrer',
  //       body: JSON.stringify([values]),
  //     }
  //   )
  // }

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
        tableItems={productsList}
        updateTableItems={setProductsList}
      />
    </section>
  )
}

export default SignupVolunteering
