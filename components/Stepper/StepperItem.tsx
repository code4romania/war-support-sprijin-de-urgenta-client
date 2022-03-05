import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

export interface Props {
  innerText: string
  label: string
  completed?: boolean
  active?: boolean
}

const StepperItem = ({
  innerText,
  label,
  completed = false,
  active = false,
}: Props) => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center justify-start md:flex-row">
      <div
        className={clsx(
          'transition-all border-gray-300 flex items-center justify-center w-12 h-12 p-2 rounded-full border-2',
          active && 'border-blue-600',
          completed && 'border-blue-600 bg-blue-600'
        )}
      >
        {completed ? (
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L5.70711 9.70711C5.31658 10.0976 4.68342 10.0976 4.29289 9.70711L0.292893 5.70711C-0.0976311 5.31658 -0.0976311 4.68342 0.292893 4.29289C0.683417 3.90237 1.31658 3.90237 1.70711 4.29289L5 7.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893Z"
              fill="white"
            />
          </svg>
        ) : (
          <p
            className={clsx(
              'font-bold text-gray-300',
              active && 'text-blue-600'
            )}
          >
            {innerText}
          </p>
        )}
      </div>
      <p
        className={clsx(
          'mt-2 md:mt-0 text-sm md:text-base md:ml-4 font-semibold text-gray-300 ',
          active && 'text-blue-600',
          completed && 'text-black'
        )}
      >
        {t(label)}
      </p>
    </div>
  )
}

export default StepperItem
