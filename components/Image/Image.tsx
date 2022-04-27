import clsx from 'clsx'
import NextImage from 'next/image'

/* eslint-disable @next/next/no-img-element */
export interface IImageProps {
  src: string | StaticImageData
  alt?: string
  className?: string
  width?: number
  height?: number
}

const Image = ({ src, alt, className = '', width, height }: IImageProps) => {
  return (
    <div className={clsx('leading-none', className)}>
      <NextImage
        className="object-contain w-full h-full"
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    </div>
  )
}

export default Image
