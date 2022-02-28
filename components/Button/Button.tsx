import clsx from 'clsx'
import Link from 'next/link'
import {ButtonHTMLAttributes} from "react";

export interface IButtonProps {
  text: string
  route?: string
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  variant?: 'primary' | 'secondary'
  size?: 'medium' | 'large'
}

const ButtonInner = ({
  text,
  variant = 'primary',
  size = 'large',
  ...rest
}: Pick<IButtonProps, 'text' | 'variant' | 'size'>) => {
  return (
    <div
      {...rest}
      className={clsx(
        'cursor-pointer rounded flex justify-center',
        {
          'px-12 py-11 ': size === 'large',
          'px-4 py-5': size === 'medium',
        },
        {
          'bg-blue-900 text-white': variant === 'primary',
          'bg-blue-100 text-gray-900': variant === 'secondary',
        },
        {
          'hover:bg-blue-100 hover:text-black': variant === 'primary',
          'hover:bg-blue-50 hover:text-black': variant === 'secondary',
        },
        'hover:transition-colors hover:duration-200'
      )}
    >
      <span
        className={clsx('font-semibold', {
          'text-2xl ': size === 'large',
          'text-base': size === 'medium',
        })}
      >
        {text}
      </span>
    </div>
  )
}

const Button = ({ text, route, variant, size, type = 'button', ...rest }: IButtonProps) => {
  if (route) {
    return (
      <Link href={route} passHref>
        <a>
          <ButtonInner text={text} variant={variant} size={size} {...rest} />
        </a>
      </Link>
    )
  }
  return (
    <button type={type} className="w-full">
      <ButtonInner text={text} variant={variant} size={size} {...rest} />
    </button>
  )
}

export default Button
