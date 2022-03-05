import clsx from 'clsx'

export interface ICallToActionProps {
  headingOne: string
  headingTwo?: string
  description?: string
  ctaLabel: string
  goToUrl: string
}

const CallToAction = ({
  headingOne,
  headingTwo,
  description,
  ctaLabel,
  goToUrl,
}: ICallToActionProps) => {
  return (
    <div
      className={clsx(
        'flex flex-col items-start gap-8 py-9',
        'md:items-center'
      )}
    >
      <h2 className="flex flex-col gap-1 mb-1 text-2xl font-bold text-left md:gap-2 md:items-center md:text-center">
        <span>{headingOne}</span>
        <span>{headingTwo}</span>
      </h2>
      <p className="md:px-12 md:text-center">{description}</p>
      <a
        href={goToUrl}
        rel="noreferrer"
        target="_blank"
        className={clsx(
          'px-8 py-4 text-xl rounded font-semibold text-white  bg-green-50',
          'md:px-20'
        )}
      >
        {ctaLabel}
      </a>
    </div>
  )
}

export default CallToAction
