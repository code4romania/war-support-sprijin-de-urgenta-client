import clsx from 'clsx'

/* eslint-disable @next/next/no-img-element */
export interface IImageProps {
  src: string
  alt?: string
  className?: string
}

const Image = ({ src, alt, className = '' }: IImageProps) => {
  return (
    <div className={clsx("leading-none", className)}>
      <img className="object-contain w-full h-full" src={src} alt={alt} height={'100%'} width={'100%'}/>
    </div>
  )
}

export default Image
