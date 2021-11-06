import React, { useContext } from 'react'
import { first } from 'lodash'
import { Optional } from 'types'
import { ProductFragment } from 'types/graphql'
import { CartContext } from 'contexts'
import {
  AddToCartButton,
  BackButton,
  Breadcrumb,
  FacebookIcon,
  HeartIcon,
  MessageIcon,
  ProductImage,
  ProductPrice,
  RatedReviews,
  SelectBox,
  Skeleton,
  TaggedProductTitle,
  TwitterIcon,
} from 'components'

export default function ProductDetail({ loading, node }: { loading?: boolean; node?: Optional<ProductFragment> }) {
  const { addProductVariant } = useContext(CartContext)
  return (
    <Skeleton active={!node || loading}>
      <section className='overflow-hidden text-gray-600 body-font'>
        <div className='container px-5 mx-auto'>
          <div className='flex flex-wrap mx-auto lg:w-full'>
            <div className='w-full rounded lg:w-1/2'>
              <div className='object-cover aspect-w-1 aspect-h-1 skeleton-blocks'>
                <ProductImage
                  alt={node?.images.edges?.[0]?.node.altText}
                  src={node?.images.edges?.[0]?.node.largeSrc}
                  width='960'
                  height='480'
                />
              </div>
            </div>
            <div className='w-full pt-6 lg:w-1/2 lg:pl-10 lg:pb-6 lg:pt-0'>
              <div className='flex items-center mb-4 space-x-4'>
                <BackButton />
                <Breadcrumb node={node} />
              </div>
              <TaggedProductTitle node={node} />
              <div className='flex mb-4'>
                <RatedReviews />
                <span className='flex py-2 pl-3 ml-3 border-l-2 border-gray-200 space-x-2s'>
                  <a className='text-gray-500'>
                    <FacebookIcon className='w-5 h-5 skeleton-figures' />
                  </a>
                  <a className='text-gray-500'>
                    <TwitterIcon className='w-5 h-5 skeleton-figures' />
                  </a>
                  <a className='text-gray-500'>
                    <MessageIcon className='w-5 h-5 skeleton-figures' />
                  </a>
                </span>
              </div>
              <p className='leading-relaxed skeleton-multiline-texts'>
                Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde
                DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine
                tumeric. Gastropub blue bottle austin listicle pour-over.
              </p>
              <div className='flex items-center pb-5 mt-6 mb-5 border-b-2 border-gray-100'>
                <div className='flex items-center'>
                  <span className='mr-3 skeleton-blocks'>Size</span>
                  <SelectBox>
                    <option>SM</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                  </SelectBox>
                </div>
              </div>
              <div className='flex'>
                <ProductPrice node={node} />
                <AddToCartButton
                  loading={loading}
                  node={first(node?.variants.edges)?.node}
                  addProductVariant={addProductVariant}
                />
                <button className='inline-flex items-center justify-center w-10 h-10 p-0 ml-4 text-gray-500 bg-gray-200 border-0 rounded-full skeleton-blocks'>
                  <HeartIcon className='w-5 h-5' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Skeleton>
  )
}
