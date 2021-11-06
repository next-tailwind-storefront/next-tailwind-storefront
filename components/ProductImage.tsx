import { FadeInImage } from 'components'

export default function ProductImage({ alt, src }: { alt?: string | null; src?: string | null }) {
  return (
    <FadeInImage
      className='object-cover object-center rounded'
      alt={alt ?? 'Loading Image'}
      src={src ?? 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'}
    />
  )
}
