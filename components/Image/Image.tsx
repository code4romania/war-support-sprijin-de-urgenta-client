/* eslint-disable @next/next/no-img-element */
export interface IImageProps {
  src: string
  alt?: string
  className?: string
}

const Image = ({ src, alt, className }: IImageProps) => {
  return (
    <div className="leading-none">
      <img className={`${className} object-contain`} src={src} alt={alt} />
    </div>
  )
}

export default Image
