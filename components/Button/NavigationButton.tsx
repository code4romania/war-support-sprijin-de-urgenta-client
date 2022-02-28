import clsx from 'clsx'
import Link from 'next/link'

export interface INavigationButtonProps {
  text: string;
  route: string;
  isDisabled?: boolean;
  variant?: 'forward' | 'backward';
  size?: 'medium' | 'large';
}

const LinkInner = ({
  text,
  variant,
  size = 'large',
  isDisabled = false,
  ...rest
}: Pick<INavigationButtonProps, 'text' | 'variant' | 'size' | 'isDisabled'>) => {
  return (
    <div
      {...rest}
      className={clsx(
        'rounded flex justify-center',
        {
          'cursor-pointer': isDisabled === false
        },
        {
          'px-12 py-11 ': size === 'large',
          'px-4 py-5': size === 'medium',
        },
        'hover:transition-colors hover:duration-200'
      )}
    >
      <span
        className={clsx('font-semibold', {
          'text-2xl ': size === 'large',
          'text-base': size === 'medium',
          'text-gray-300': isDisabled,
          'text-gray-700 hover:text-gray-900 active:text-blue-600': isDisabled === false
        })}
      >
        {variant === 'backward' ? <span>&larr;</span> : ''}{text}{variant === 'forward' ? <span>&rarr;</span> : ''}
      </span>
    </div>
  )
}

const NavigationButton = ({ text, route, variant, size, isDisabled, ...rest }: INavigationButtonProps) => {
  if (isDisabled) {
    return (<span>
      <a>
        <LinkInner text={text} variant={variant} size={size} isDisabled={isDisabled} {...rest} />
      </a>
    </span>)
  }
  return (
    <div className="flex space-x-2 justify-center">
      <Link href={route} passHref>
        <a>
          <LinkInner text={text} variant={variant} size={size} isDisabled={isDisabled} {...rest} />
        </a>
      </Link>

    </div>
  )
}

export default NavigationButton
