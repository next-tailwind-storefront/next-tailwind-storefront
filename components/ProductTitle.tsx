import { ReactNode } from 'react'

export default function TaggedProductTitle({
  variant = 'large',
  children,
}: {
  variant?: 'large' | 'small'
  children?: ReactNode
}) {
  return variant === 'large' ? (
    <h1 className='mb-2 text-3xl font-medium text-gray-900 title-font self-baseline skeleton-texts'>{children}</h1>
  ) : (
    <h2 className='mb-2 text-lg font-medium text-gray-900 title-font skeleton-texts self-baseline'>{children}</h2>
  )
}
