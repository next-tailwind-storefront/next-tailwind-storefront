import { useMemo } from 'react'
import { ProductFragment } from 'types'

export default function ProductPrice({
  node,
  variant = 'large',
}: {
  node?: ProductFragment
  variant?: 'large' | 'small'
}) {
  const productPrice = useMemo(
    () =>
      node
        ? new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: node.variants.edges?.[0]?.node?.priceV2.currencyCode,
          }).format(node.variants.edges?.[0]?.node?.priceV2.amount)
        : '$00',
    [node],
  )
  return variant === 'large' ? (
    <span className='text-2xl font-medium text-gray-900 title-font skeleton-blocks'>{productPrice}</span>
  ) : (
    <span className='text-xs font-medium tracking-widest text-gray-500 self-baseline title-font skeleton-texts'>
      {productPrice}
    </span>
  )
}
