import clsx from 'clsx'

export interface ICallToActionProps {
  headingOne: string
  headingTwo?: string
  description?: string
  ctaLabel: string
}

const CallToAction = ({
  headingOne,
  headingTwo,
  description,
  ctaLabel,
}: ICallToActionProps) => {
  return (
    <div
      className={clsx(
        'flex flex-col items-start gap-8 py-9',
        'md:items-center'
      )}
    >
      <h2 className="flex flex-col gap-1 mb-1 text-2xl font-bold md:gap-2 md:items-center md:text-center text-left">
        <span>{headingOne}</span>
        <span>{headingTwo}</span>
      </h2>
      <p className="md:px-12 md:text-center">{description}</p>
      <a
        href="https://www.dopomoha.ro"
        rel="noreferrer"
        target="_blank"
        className={clsx(
          'px-4 py-3 text-xl font-semibold text-white  bg-green-50',
          'md:px-20'
        )}
      >
        {ctaLabel}
      </a>
    </div>
  )
}

export default CallToAction
