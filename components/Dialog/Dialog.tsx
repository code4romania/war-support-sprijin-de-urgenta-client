import { ReactNode } from 'react'
import { DialogOverlay, DialogContent } from '@reach/dialog'

import styles from './styles.module.css'
import IconButton from '../Button/IconButton'

export interface IDialogProps {
  isOpen: boolean
  onDismiss: () => void
  children: ReactNode
}

const Dialog = ({ isOpen, onDismiss, children }: IDialogProps) => {
  return (
    <>
      {isOpen && (
        <DialogOverlay className={styles.wrapper} onClick={onDismiss}>
          <div className={styles.backdrop} />
          <DialogContent className={styles.content}>
            <IconButton
              variant="x"
              className={styles.closeButton}
              onClick={onDismiss}
            />
            {children}
          </DialogContent>
        </DialogOverlay>
      )}
    </>
  )
}

export default Dialog
