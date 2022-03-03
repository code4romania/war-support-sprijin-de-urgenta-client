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

const Dialog = ({ isOpen, title, onDismiss, children }: IDialogProps) => {
  return (
    <>
      {isOpen && (
        <DialogOverlay className={styles.wrapper} onClick={onDismiss}>
          <div className={styles.backdrop} />
          <DialogContent aria-label="dialog-content" className={styles.content}>
            <div className={styles.header}>
              <h2 className={styles.title}>{title}</h2>
              <IconButton
                variant="x"
                className={styles.closeButton}
                onClick={onDismiss}
              />
            </div>

            {children}
          </DialogContent>
        </DialogOverlay>
      )}
    </>
  )
}

export default Dialog
