import clsx from 'clsx'
import { ReactNode } from 'react'

export interface Props {
  direction: 'forward' | 'backward'
  disabled?: boolean
  className?: string
  children: ReactNode
}

const StepsArrow = ({ direction, disabled = false, children }: Props) => {
  const svgOpacity = disabled ? '0.3' : '1'

  if (direction === 'backward')
    return (
      <div
        className={clsx(
          'justify-items-start flex items-center cursor-pointer',
          disabled && 'cursor-default'
        )}
      >
        <svg
          width="20"
          height="11"
          viewBox="0 0 20 11"
          className="mr-2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 9.99072L1 5.99072M1 5.99072L5 1.99072M1 5.99072L19 5.99072"
            stroke="#374151"
            strokeWidth="2"
            strokeOpacity={svgOpacity}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className={clsx('font-bold', disabled && 'opacity-25')}>
          {children}
        </p>
      </div>
    )

  return (
    <div className="flex items-center cursor-pointer">
      <p className={clsx('font-bold', disabled && 'opacity-25')}>{children}</p>
      <svg
        className="ml-2"
        width="20"
        height="11"
        viewBox="0 0 20 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 1.99072L19 5.99072M19 5.99072L15 9.99072M19 5.99072L1 5.99072"
          stroke="#374151"
          strokeOpacity={svgOpacity}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default StepsArrow
