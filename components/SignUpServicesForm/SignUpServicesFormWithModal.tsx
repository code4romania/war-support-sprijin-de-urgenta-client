import Button from '@/components/Button'
import { GoodsTransportServicesRequest } from 'api/types'
import clsx from 'clsx'
import { TransportGoodsForm } from 'forms'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Dialog from '../Dialog'


const SignUpServicesFormWithModal = () => {
  const { t } = useTranslation()

  const [showDialog, setShowDialog] = useState(false)

  const onTransportGoodsSubmit = (data: GoodsTransportServicesRequest) => {
    console.log(data);
  }

  return (
    <main
      className={clsx(
        'container grid place-items-start',
        'bg-blue-50 rounded',
        'mx-auto px-8 py-7'
      )}
    >
      <div className="flex items-center gap-4 mb-8">
        <h3 className="min-w-fit">{t('services.transport-goods')}</h3>
        <Button
          text={t('add')}
          size="small"
          variant="tertiary"
          onClick={() => setShowDialog(true)}
        />
      </div>
      <div className="flex items-center gap-4 mb-8">
        <h3 className="min-w-fit">{t('services.transport-people')}</h3>
        <Button
          text={t('add')}
          size="small"
          variant="tertiary"
          onClick={() => setShowDialog(true)}
        />
      </div>

      {/* TODO: The content of the dialog should be dynamically set based on the type of service selected via button  */}
      <Dialog isOpen={showDialog} onDismiss={() => setShowDialog(false)}>
        <TransportGoodsForm onSubmit={onTransportGoodsSubmit} />
      </Dialog>
    </main>
  )
}

export default SignUpServicesFormWithModal
