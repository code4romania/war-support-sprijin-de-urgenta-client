import React, { ReactNode, useState } from 'react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import ResourcesTableList from '@/components/ResourcesTableList'
import Button from '@/components/Button'
import Dialog from '@/components/Dialog'

export interface IProductsProps {
  resourceType: string
  label: string
  children: ReactNode
}

export interface IResourcesFormProps {
  categories: IProductsProps[]
  tableTitle: string
  tableColumns: string[]
  tableItems: any[]
  updateTableItems: (items: any[]) => void;
  showDialog: boolean
  setShowDialog: (showDialog: boolean) => void
}

const ResourcesForm = ({
  categories,
  tableTitle,
  tableColumns,
  tableItems,
  updateTableItems,
  showDialog,
  setShowDialog
}: IResourcesFormProps) => {
  const { t } = useTranslation()

  const [dialogResourceType, setDialogResourceType] = useState('others')

  const handleDialogDismiss = () => {
    setShowDialog(false)
  }

  const renderDialog = (resourceType: string) => {
    const { label, children } = categories.find(
      (aProduct) => aProduct.resourceType === resourceType
    ) || { label: '' }

    return (
      <Dialog
        key={`${resourceType}_${label}`}
        isOpen={showDialog}
        onDismiss={handleDialogDismiss}
      >
        {
          <>
            <Dialog.Header title={t(label)} onDismiss={handleDialogDismiss} />
            {children}
          </>
        }
      </Dialog>
    )
  }

  const onItemRemoved = (itemId: string) => {
    const index = tableItems.findIndex((p) => p.name === itemId)
    if (index > -1) {
      updateTableItems(tableItems.splice(index, 1))
    }
  }

  return (
    <main
      className={clsx(
        'container grid place-items-start',
        'bg-blue-50 rounded',
        'px-8 py-7 w-full'
      )}
    >
      <section className={clsx('flex flex-col md:flex-row w-full')}>
        <div className="w-full md:w-1/2">
          {categories.map(({ resourceType, label }, index) => (
            <React.Fragment key={`${resourceType}_${label}_${index}`}>
              <div className="flex items-center w-full gap-4 mb-8">
                <h3 className="flex-1 min-w-fit">{t(label)}</h3>
                <Button
                  text={t('add')}
                  size="small"
                  className="flex-1"
                  variant="tertiary"
                  onClick={() => {
                    setShowDialog(true)
                    setDialogResourceType(resourceType)
                  }}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
        <ResourcesTableList
          className="w-full ml-0 md:w-1/2 md:ml-4"
          title={tableTitle}
          columns={tableColumns}
          list={tableItems.map((t) => ({
            id: t.name,
            name: t.name,
            quantity: t.quantity,
            um: t.unit_type,
          }))}
          onItemRemoved={onItemRemoved}
        />
        {!!dialogResourceType && renderDialog(dialogResourceType)}
      </section>
    </main>
  )
}

export default ResourcesForm
