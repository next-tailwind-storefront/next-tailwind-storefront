import { ReactNode } from 'react'

export default function ProductTitleTag({
  variant = 'large',
  children,
}: {
  variant?: 'large' | 'small'
  children?: ReactNode
}) {
  return variant === 'large' ? (
    <h2 className='mb-1 text-sm tracking-widest text-gray-500 self-baseline title-font skeleton-texts'>{children}</h2>
  ) : (
    <h3 className='mb-1 text-xs tracking-widest text-gray-500 self-baseline title-font skeleton-texts'>{children}</h3>
  )
}
