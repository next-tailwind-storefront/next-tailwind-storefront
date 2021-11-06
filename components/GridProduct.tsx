import React from 'react'
import Link from 'next/link'
import { ProductFragment } from 'types/graphql'
import { ProductImage, Skeleton, TaggedProductTitle } from 'components'

export default function GridProduct({ loading, node }: { loading?: boolean; node?: ProductFragment }) {
  return (
    <Skeleton active={loading}>
      <div className='w-full p-4 lg:w-1/4 md:w-1/2'>
        <Link
          passHref
          href={{
            pathname: node ? '/product/[handle]' : '',
            query: { handle: node?.handle ?? '' },
          }}
        >
          <div className='relative block h-48 overflow-hidden rounded cursor-pointer skeleton-blocks'>
            <ProductImage
              alt={node?.images.edges?.[0]?.node.altText}
              src={node?.images.edges?.[0]?.node.thumbnailSrc}
            />
          </div>
        </Link>
        <div className='mt-4'>
          <TaggedProductTitle node={node} variant='small' isLinked hasPrice />
        </div>
      </div>
    </Skeleton>
  )
}
