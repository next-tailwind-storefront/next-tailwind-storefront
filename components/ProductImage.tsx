import { FadeInImage } from 'components'

export default function ProductImage({
  alt,
  src,
  ...props
}: { alt?: string | null; src?: string | null } | React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <FadeInImage
      className='object-cover object-center w-full h-full rounded'
      alt={alt ?? 'Loading Image'}
      src={src ?? 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'}
      {...props}
    />
  )
}
