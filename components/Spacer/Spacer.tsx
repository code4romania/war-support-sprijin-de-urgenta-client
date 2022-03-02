export interface ISpacerProps {
  axis: 'vertical' | 'horizontal'
  size: string
}

const Spacer = ({ axis, size }: ISpacerProps) => {
  const width = axis === 'vertical' ? 1 : size
  const height = axis === 'horizontal' ? 1 : size
  return (
    <span
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
