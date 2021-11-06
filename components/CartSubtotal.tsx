import { CheckoutFragment, Optional } from 'types'

export default function CartSubtotal({ node }: { node?: Optional<CheckoutFragment> }) {
  return (
    <div className='flex justify-between text-base font-medium text-gray-900'>
      <p className='skeleton-texts'>Subtotal</p>
      <p className='skeleton-texts'>
        {node?.subtotalPriceV2
          ? new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: node.subtotalPriceV2.currencyCode,
            }).format(node.subtotalPriceV2.amount)
          : '$00'}
      </p>
    </div>
  )
}
