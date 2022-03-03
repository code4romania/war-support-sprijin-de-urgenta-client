export interface ISpacerProps {
  axis?: 'vertical' | 'horizontal'
  size: string
  className?: string
}

const Spacer = ({ axis, size, className }: ISpacerProps) => {
  const width = axis === 'vertical' ? 1 : size
  const height = axis === 'horizontal' ? 1 : size
  return (
    <span
      className={className}
      style={{
        display: 'block',
        width,
        minWidth: width,
        height,
        minHeight: height,
      }}
    />
  )
}

export default Spacer
