import { Dispatch, SetStateAction } from 'react'
import { Dialog } from '@headlessui/react'
import { CheckoutFragment, CheckoutLineItemFragment, Optional } from 'types'
import {
  CartLineItem,
  CartSubtotal,
  CheckoutButton,
  CloseButton,
  ContinueShoppingLink,
  RightPanel,
  Skeleton,
} from 'components'

export default function Cart({
  loading,
  node,
  cartOpen,
  setCartOpen = () => null,
  removeLineItem = async () => undefined,
  updateLineItemQuantity = async () => undefined,
}: {
  loading?: boolean
  node?: Optional<CheckoutFragment>
  cartOpen?: boolean
  setCartOpen?: Dispatch<SetStateAction<boolean>>
  removeLineItem?: (lineItemId: CheckoutLineItemFragment['id']) => Promise<void>
  updateLineItemQuantity?: (lineItemId: CheckoutLineItemFragment['id'], quantity: number) => Promise<void>
}) {
  return (
    <RightPanel open={cartOpen} setOpen={setCartOpen}>
      <Skeleton active={loading}>
        <div className='flex flex-col h-full overflow-y-scroll bg-white shadow-xl'>
          <div className='flex-1 px-4 py-6 overflow-y-auto sm:px-6'>
            <div className='flex items-start justify-between'>
              <Dialog.Title className='text-lg font-medium text-gray-900'>Shopping cart</Dialog.Title>
              <div className='flex items-center ml-3 h-7'>
                <CloseButton onClick={() => setCartOpen(false)} />
              </div>
            </div>
            <div className='mt-8'>
              <div className='flow-root'>
                <ul role='list' className='-my-6 divide-y divide-gray-200'>
                  {node?.lineItems.edges.length ? (
                    node?.lineItems.edges.map(({ node }) => (
                      <CartLineItem
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
            </div>
          </div>
          <div className='px-4 py-6 border-t border-gray-200 sm:px-6'>
            <CartSubtotal node={node} />
            <p className='text-sm text-gray-500 mt-0.5'>Shipping and taxes calculated at checkout.</p>
            <CheckoutButton />
            <ContinueShoppingLink onClick={() => setCartOpen(false)} />
          </div>
        </div>
      </Skeleton>
    </RightPanel>
  )
}
