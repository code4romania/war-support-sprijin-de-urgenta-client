import { ReactNode } from 'react'
import { DialogOverlay, DialogContent } from '@reach/dialog'

import styles from './styles.module.css'
import IconButton from '../Button/IconButton'

export interface IDialogProps {
  isOpen: boolean
  title?: string
  onDismiss: () => void
  children: ReactNode
}

//****** Usage ******
//
//    <Dialog
//      title={title}
//      isOpen={showDialog}
//      onDismiss={() => {}}
//    >
//      <Dialog.Header title='Awesome Title'/>
//      <YourAmazingComponent/>
//    </Dialog>

const Dialog = ({ isOpen, onDismiss, children }: IDialogProps) => {
  return (
    <>
      {isOpen && (
        <DialogOverlay className={styles.wrapper} onClick={onDismiss}>
          <div className={styles.backdrop} />
          <DialogContent aria-label="dialog-content" className={styles.content}>
            {children}
          </DialogContent>
        </DialogOverlay>
      )}
    </>
  )
}

Dialog.Header = function DialogHeader({
  title,
  onDismiss,
}: Pick<IDialogProps, 'title' | 'onDismiss'>) {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <IconButton
        variant="x"
        className={styles.closeButton}
        onClick={onDismiss}
      />
    </div>
  )
}

export default Dialog
