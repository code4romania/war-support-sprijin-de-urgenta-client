import Button from '@/components/Button'
import { TransportServicesRequest } from 'api/types'
import clsx from 'clsx'
import { TransportGoodsForm } from 'forms'
import { TransportPersonsForm } from 'forms/TransportPersonsForm'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Dialog from '../Dialog'
import ResourcesTableList from '../ResourcesTableList'

interface ISignUpServicesFormProps {
  onAddGoodItem: (data: TransportServicesRequest) => void
  onAddPersonItem: (data: TransportServicesRequest) => void
}

export const SignUpServicesForm = ({ onAddGoodItem, onAddPersonItem }: ISignUpServicesFormProps) => {
  const { t } = useTranslation()

  const [showDialog, setShowDialog] = useState(false)
  const [showForm, setShowForm] = useState<
    'transportGoods' | 'transportPersons'
  >()

  const [goodsList, setGoodsList] = useState<TransportServicesRequest[]>([])
  const [personsTransportList, setPersonsTransportList] = useState<
    TransportServicesRequest[]
  >([])

  const onTransportGoodsSubmit = (data: TransportServicesRequest) => {
    setGoodsList((state) => [...state, data])
    onAddGoodItem(data)
    handleDialogDismiss()
  }

  const onTransporPersonsSubmit = (data: TransportServicesRequest) => {
    setPersonsTransportList((state) => [...state, data])
    onAddPersonItem(data)
    handleDialogDismiss()
  }

  const onGoodsRemoved = (itemName: string) => {
    const index = goodsList.findIndex((t) => t.driver_name === itemName)
    if (index > -1) {
      goodsList.splice(index, 1)
      setGoodsList(goodsList)
    }
  }
  const handleDialogDismiss = () => {
    setShowDialog(false)
    setShowForm(undefined)
  }

  return (
    <section
      className={clsx(
        'container grid place-items-start',
        'bg-blue-50 rounded',
        'px-8 py-7'
      )}
    >
      <h3 className="mb-8 text-xl font-semibold">{t('services')}</h3>
      <div className={clsx('w-full')}>
        <div
          className={clsx(
            'flex flex-col items-center w-full gap-4 mb-6 ',
            'md:flex-row md:items-start'
          )}
        >
          <div className="flex items-center w-full gap-4">
            <h4 className="flex-1 min-w-fit">
              {t('services.transport-goods')}
            </h4>
            <Button
              text={t('add')}
              size="small"
              className="flex-1"
              variant="tertiary"
              onClick={() => {
                setShowForm('transportGoods')
                setShowDialog(true)
              }}
            />
          </div>
          <div className="w-full md:flex-[1_0_50%]">
            {goodsList.length > 0 && (
              <ResourcesTableList
                columns={[t('services.driver-name')]}
                list={goodsList.map((t) => ({
                  id: t.driver_name,
                  name: t.driver_name,
                }))}
                onItemRemoved={onGoodsRemoved}
              />
            )}
          </div>
        </div>
        <div
          className={clsx(
            'flex flex-col items-center w-full gap-4 ',
            'md:flex-row md:items-start'
          )}
        >
          <div className="flex items-center w-full gap-4">
            <h4 className="flex-1 min-w-fit">
              {t('services.transport-people')}
            </h4>
            <Button
              text={t('add')}
              className="flex-1"
              size="small"
              variant="tertiary"
              onClick={() => {
                setShowForm('transportPersons')
                setShowDialog(true)
              }}
            />
          </div>
          <div className="w-full md:flex-[1_0_50%]">
            {personsTransportList.length > 0 && (
              <ResourcesTableList
                columns={[t('services.driver-name')]}
                list={personsTransportList.map((t) => ({
                  id: t.driver_name,
                  name: t.driver_name,
                }))}
                onItemRemoved={onGoodsRemoved}
              />
            )}
          </div>
        </div>
      </div>
      {/* TODO: The content of the dialog should be dynamically set based on the type of service selected via button  */}
      <Dialog isOpen={showDialog} onDismiss={handleDialogDismiss}>
        {showForm === 'transportGoods' && (
          <>
            <Dialog.Header
              title={t('services.transport-goods')}
              onDismiss={handleDialogDismiss}
            />
            <TransportGoodsForm onSubmit={onTransportGoodsSubmit} />
          </>
        )}
        {showForm === 'transportPersons' && (
          <>
            <Dialog.Header
              title={t('services.transport-people')}
              onDismiss={handleDialogDismiss}
            />
            <TransportPersonsForm onSubmit={onTransporPersonsSubmit} />
          </>
        )}
      </Dialog>
    </section>
  )
}
