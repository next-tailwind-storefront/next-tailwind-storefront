import { CheckoutFragment, CheckoutLineItemFragment } from 'types'
import { ListCheckoutLineItem } from 'components'

export default function CartProducts({
  node,
  removeLineItem = async () => undefined,
  updateLineItemQuantity = async () => undefined,
}: {
  node?: CheckoutFragment
  removeLineItem?: (lineItemId: CheckoutLineItemFragment['id']) => Promise<void>
  updateLineItemQuantity?: (lineItemId: CheckoutLineItemFragment['id'], quantity: number) => Promise<void>
}) {
  return (
    <div className='flow-root'>
      <ul role='list' className='-my-6 divide-y divide-gray-200 skeleton-blocks'>
        {node?.lineItems.edges.length ? (
          node?.lineItems.edges.map(({ node }) => (
            <ListCheckoutLineItem
              key={node.id}
              node={node}
              onRemoveItem={() => removeLineItem(node.id)}
              onUpdateItemQuantity={(quantity: number) => updateLineItemQuantity(node.id, quantity)}
            />
          ))
        ) : (
          <li>
            <p className='text-sm text-gray-500 mt-0.5'>The cart is empty.</p>
          </li>
        )}
      </ul>
    </div>
  )
}
