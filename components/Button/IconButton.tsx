import clsx from 'clsx'
export interface IIconButtonProps {
  isDisabled?: boolean;
  variant?: 'edit' | 'delete';
}

const IconButtonInner = ({
  variant,
  isDisabled = false,
  ...rest
}: Pick<IIconButtonProps, 'variant' | 'isDisabled'>) => {
  return (
    <div
      {...rest}
      className={clsx(
        'rounded flex justify-center',
        {
          'cursor-pointer': isDisabled === false
        },
        'hover:transition-colors hover:duration-200'
      )}
    >
      {variant === 'delete' &&
        <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#BB0000" opacity={isDisabled ? 0.3 : 1} d="M11.5193 6V16H3.51929V6H11.5193ZM10.0193 0H5.01929L4.01929 1H0.519287V3H14.5193V1H11.0193L10.0193 0ZM13.5193 4H1.51929V16C1.51929 17.1 2.41929 18 3.51929 18H11.5193C12.6193 18 13.5193 17.1 13.5193 16V4Z" />
        </svg>}

      {variant === 'edit' &&
        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill={isDisabled ? '#B3B3B3' : '#323232'} d="M11.1069 6.02L12.0269 6.94L2.96688 16H2.04688V15.08L11.1069 6.02ZM14.7069 0C14.4569 0 14.1969 0.1 14.0069 0.29L12.1769 2.12L15.9269 5.87L17.7569 4.04C18.1469 3.65 18.1469 3.02 17.7569 2.63L15.4169 0.29C15.2169 0.09 14.9669 0 14.7069 0ZM11.1069 3.19L0.046875 14.25V18H3.79688L14.8569 6.94L11.1069 3.19Z" />
        </svg>
      }


    </div>
  )
}

const IconButton = ({ variant, isDisabled, ...rest }: IIconButtonProps) => {

  return (
    <button type="button" disabled={isDisabled}>
      <IconButtonInner variant={variant} isDisabled={isDisabled} {...rest} />
    </button>
  )
}

export default IconButton
