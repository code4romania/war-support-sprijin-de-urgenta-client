/* eslint-disable @next/next/no-img-element */
export interface IImageProps {
  src: string
  alt?: string
}

const Image = ({ src, alt }: IImageProps) => {
  return (
    <div className="leading-none">
      <img className="object-contain" src={src} alt={alt} />
    </div>
  )
}

export default Image
