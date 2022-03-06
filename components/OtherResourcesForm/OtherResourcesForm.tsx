import React, { useMemo, useState } from 'react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useData, useOthersForm } from '@/hooks/useData'
import endpoints from 'endpoints.json'
import Dialog from './Dialog'
import ResourcesForm from '@/components/ResourcesForm'
import { DonateOtherRequest } from 'api'

export type OtherResourceForm = {
  name: string
  county_coverage: string[]
  category?: number
  description?: string
  available_until?: string
  town?: string
}

const OtherResourcesForm = ({}) => {
  const { t } = useTranslation()
  const { data: formData } = useOthersForm()
  const { data: categoriesList } = useData(endpoints['categories/other'])

  const tableColumns = [t('resources.other')]

  const [showDialog, setShowDialog] = useState(false)
  const [productsList, setProductsList] = useState<DonateOtherRequest[]>([])

  const handleDialogDismiss = () => {
    setShowDialog(false)
  }

  const onAddItem = (data: DonateOtherRequest) => {
    handleDialogDismiss()
    setProductsList((state) => [...state, data])
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
        <Dialog
          counties={countyCovarage}
          onSubmit={onAddItem}
          category={category.id}
        />
      ),
    })) || []
  //
  // const onSubmit = async (values: any) => {
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_PUBLIC_API}/${i18n.language}${endpoints['donate/other']}`,
  //       {
  //         method: 'POST',
  //         mode: 'cors',
  //         cache: 'no-cache',
  //         credentials: 'same-origin',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         redirect: 'follow',
  //         referrerPolicy: 'no-referrer',
  //         body: JSON.stringify([values]),
  //       }
  //     )
  //
  //     if (res.ok) {
  //       setServerErrors({})
  //       const [data] = await res.json()
  //       console.log('data', data)
  //     } else {
  //       const [data] = await res.json()
  //       setServerErrors(data)
  //     }
  //   } catch (e) {
  //     console.log('e', e)
  //   }
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
        'signup.other.header'
      )}:`}</h3>
      <ResourcesForm
        categories={categories}
        tableTitle={t('resources.added.other')}
        tableColumns={tableColumns}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        tableItems={productsList}
        updateTableItems={setProductsList}
      />
    </section>
  )
}

export default OtherResourcesForm
