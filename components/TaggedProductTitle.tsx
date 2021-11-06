import React from 'react'
import Link from 'next/link'
import { Optional, ProductFragment } from 'types'
import { ProductPrice, ProductTitle, ProductTitleTag } from 'components'

export default function TaggedProductTitle({
  node,
  variant = 'large',
  isLinked = false,
  hasPrice = false,
}: {
  node?: Optional<ProductFragment>
  variant?: 'large' | 'small'
  isLinked?: boolean
  hasPrice?: boolean
}) {
  return (
    <div className='flex flex-col flex-1'>
      <div className='flex justify-between'>
        <ProductTitleTag variant={variant}>{node?.vendor ?? 'Loading Vendor'}</ProductTitleTag>
        {hasPrice && <ProductPrice node={node} variant={variant} />}
      </div>
      <Link
        passHref
        href={{
          pathname: node ? '/product/[handle]' : '',
          query: { handle: node?.handle ?? '' },
        }}
      >
        <a className={isLinked ? 'cursor-pointer' : 'pointer-events-none'}>
          <ProductTitle variant={variant}>{node?.title ?? 'Loading Product Title'}</ProductTitle>
        </a>
      </Link>
    </div>
  )
}
