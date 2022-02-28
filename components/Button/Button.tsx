import clsx from 'clsx'
import Link from 'next/link'

export interface IButtonProps {
  text: string
  route: string
  variant?: 'primary' | 'secondary'
}

const ButtonInner = ({
  text,
  variant,
  ...rest
}: Pick<IButtonProps, 'text' | 'variant'>) => {
  return (
    <div
      {...rest}
      className={clsx(
        'cursor-pointer rounded md px-12 py-11 flex justify-center',
        {
          'bg-blue-900 text-white':
            variant === 'primary' || variant === undefined,
          'bg-blue-100 text-gray-900': variant === 'secondary',
        },
        {
          'hover:bg-blue-100 hover:text-black':
            variant === 'primary' || variant === undefined,
          'hover:bg-blue-50 hover:text-black': variant === 'secondary',
        },
        'hover:transition-colors hover:duration-200'
      )}
    >
      <span className="text-2xl font-semibold">{text}</span>
    </div>
  )
}

const Button = ({ text, route, variant, ...rest }: IButtonProps) => {
  if (route) {
    return (
      <Link href={route} passHref>
        <ButtonInner text={text} variant={variant} {...rest} />
      </Link>
    )
  }
  return <ButtonInner text={text} variant={variant} {...rest} />
}

export default Button
