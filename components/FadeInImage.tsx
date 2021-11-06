import { useRef, useState } from 'react'

export default function FadeInImage({ className, alt, src, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  const imageRef = useRef<HTMLImageElement>(null)
  const [opacityClassName, setOpacityClassName] = useState('opacity-0')
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        alt={alt}
        src={src}
        className={`transition-opacity duration-500 ${opacityClassName} ${className}`}
        onLoad={() => setOpacityClassName('opacity-100')}
        {...props}
      />
    </>
  )
}
