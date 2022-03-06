import { ReactNode } from 'react'
import { DialogOverlay, DialogContent } from '@reach/dialog'

import styles from './styles.module.css'
import IconButton from '../Button/IconButton'
import { AnimatePresence, motion } from 'framer-motion'

import { QUERIES } from '@/utils/constants'
import { useMediaQuery } from '@/hooks/useMediaQuery'

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
  const isLarge = useMediaQuery(QUERIES.md)
  const MotionDialogOverlay = motion(DialogOverlay)
  const MotionDialogContent = motion(DialogContent)
  return (
    <AnimatePresence initial={false} exitBeforeEnter={true}>
      {isOpen && (
        <MotionDialogOverlay className={styles.wrapper} onClick={onDismiss}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4 } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className={styles.backdrop}
          />
          <MotionDialogContent
            initial={{ opacity: isLarge ? 0 : 1, y: isLarge ? 100 : '100%' }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.4,
                ease: [0.6, 0.01, -0.05, 0.95],
              },
            }}
            exit={{
              opacity: isLarge ? 0 : 1,
              scale: isLarge ? 0.9 : 1,
              y: isLarge ? 0 : '100%',
              transition: { duration: 0.2 },
            }}
            aria-label="dialog-content"
            className={styles.content}
          >
            {children}
          </MotionDialogContent>
        </MotionDialogOverlay>
      )}
    </AnimatePresence>
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
