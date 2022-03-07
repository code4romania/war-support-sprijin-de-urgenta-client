import React, { ReactNode, useState } from 'react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import ResourcesTableList from '@/components/ResourcesTableList'
import Button from '@/components/Button'
import Dialog from '@/components/Dialog'
import { FormPageProps } from '@/components/FormPage/FormPage'

export interface ICategoryProps {
  resourceType: string
  label: string
  children: ReactNode
}

export interface IResourcesFormProps {
  type: FormPageProps
  categories: ICategoryProps[]
  tableTitle: string
  tableColumns: string[]
  tableItems: any[]
  onRemoveItem: (index: number) => void
  showDialog: boolean
  setShowDialog: (showDialog: boolean) => void
}

const ResourcesForm = ({
  type,
  categories,
  tableTitle,
  tableColumns,
  tableItems,
  onRemoveItem,
  showDialog,
  setShowDialog,
}: IResourcesFormProps) => {
  const { t } = useTranslation()

  const [dialogResourceType, setDialogResourceType] = useState('others')

  const { label: dialogTitle, children: dialogContent } = categories.find(
    (aProduct) => aProduct.resourceType === dialogResourceType
  ) || { label: '' }

  const handleDialogDismiss = () => {
    setShowDialog(false)
  }

  const onItemRemoved = (itemId: string) => {
    const index = tableItems.findIndex((p) => p.name === itemId)
    onRemoveItem(index)
  }

  return (
    <>
      <div className={clsx('flex flex-col gap-4 md:flex-row w-full')}>
        <div className="w-full md:w-1/2">
          {categories.map(({ resourceType, label }, index) => (
            <React.Fragment key={`${resourceType}_${label}_${index}`}>
              <div className="flex items-center w-full gap-4 mb-8">
                <h4 className="flex-1 min-w-fit">{t(label)}</h4>
                <Button
                  text={t('add')}
                  size="small"
                  className="flex-1"
                  variant="tertiary"
                  onClick={() => {
                    setDialogResourceType(resourceType)
                    setShowDialog(true)
                  }}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
        {type === FormPageProps.Offer && (
          <div className="w-full md:flex-[1_0_50%]">
            {tableItems.length > 0 && (
              <ResourcesTableList
                title={tableTitle}
                columns={tableColumns}
                list={tableItems.map((t) => ({
                  id: t.name,
                  name: t.name || t.unit_type,
                  quantity: t.quantity,
                  um: t.unit_type,
                }))}
                onItemRemoved={onItemRemoved}
              />
            )}
          </div>
        )}
      </div>
      <Dialog isOpen={showDialog} onDismiss={handleDialogDismiss}>
        {
          <>
            <Dialog.Header
              title={t(dialogTitle)}
              onDismiss={handleDialogDismiss}
            />
            {dialogContent}
          </>
        }
      </Dialog>
    </>
  )
}

export default ResourcesForm
