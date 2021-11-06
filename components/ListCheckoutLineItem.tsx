import Link from 'next/link'
import { CheckoutLineItemFragment } from 'types'
import { ProductImage, QuantityInput, Skeleton } from 'components'

export default function ListCheckoutLineItem({
  loading,
  node,
  onRemoveItem,
  onUpdateItemQuantity,
}: {
  loading?: boolean
  node?: CheckoutLineItemFragment
  onRemoveItem?: () => void
  onUpdateItemQuantity?: (quantity: number) => void
}) {
  return (
    <Skeleton active={loading}>
      <li className='flex py-6'>
        <Link
          passHref
          href={{
            pathname: node ? '/product/[handle]' : '',
            query: { handle: node?.variant?.product.handle ?? '' },
          }}
        >
          <div className='relative flex-shrink-0 block overflow-hidden border border-gray-200 w-28 h-28 rounded-md skeleton-blocks'>
            <ProductImage alt={node?.variant?.image?.altText} src={node?.variant?.image?.thumbnailSrc} />
          </div>
        </Link>
        <div className='flex flex-col flex-1 ml-4'>
          <div className='flex justify-between text-base font-medium text-gray-900'>
            <Link
              passHref
              href={{
                pathname: node ? '/product/[handle]' : '',
                query: { handle: node?.variant?.product.handle ?? '' },
              }}
            >
              <h3 className='skeleton-texts'>{node?.title ?? 'Loading Product Title'}</h3>
            </Link>
          </div>
          <div className='flex-1'>
            {node?.variant?.selectedOptions.map((option) => (
              <p key={option.name} className='mt-1 text-sm text-gray-500'>
                {option.name}: {option.value}
              </p>
            ))}
          </div>
          <QuantityInput quantity={node?.quantity} onChange={onUpdateItemQuantity} />
        </div>
        <div className='flex flex-col ml-4 flex-0'>
          <p className='flex-1 ml-4 skeleton-texts flex-start'>
            {node
              ? node?.variant?.priceV2 && node?.quantity
                ? new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: node.variant.priceV2.currencyCode,
                  }).format(
                    node.variant.priceV2.amount * node.quantity -
                      (node?.discountAllocations?.[0]?.allocatedAmount?.amount ?? 0),
                  )
                : ''
              : '$00'}
          </p>
          <div className='flex flex-col flex-end'>
            {node?.quantity ? (
              <button
                type='button'
                className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
                onClick={onRemoveItem}
              >
                Remove
              </button>
            ) : null}
          </div>
        </div>
      </li>
    </Skeleton>
  )
}
