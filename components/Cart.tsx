import { Dispatch, SetStateAction, useMemo } from 'react'
import { first } from 'lodash'
import { Dialog } from '@headlessui/react'
import { CheckoutFragment, CheckoutLineItemFragment } from 'types'
import {
  CartProducts,
  CartSubtotal,
  CheckoutButton,
  CloseButton,
  ContinueShoppingLink,
  RightPanel,
  Skeleton,
} from 'components'

export default function Cart({
  loading,
  nodes = [],
  cartOpen,
  setCartOpen = () => null,
  removeLineItem = async () => undefined,
  updateLineItemQuantity = async () => undefined,
}: {
  loading?: boolean
  nodes?: CheckoutFragment[]
  cartOpen?: boolean
  setCartOpen?: Dispatch<SetStateAction<boolean>>
  removeLineItem?: (lineItemId: CheckoutLineItemFragment['id']) => Promise<void>
  updateLineItemQuantity?: (lineItemId: CheckoutLineItemFragment['id'], quantity: number) => Promise<void>
}) {
  const node = useMemo(() => first(nodes), [nodes])
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
              <CartProducts
                node={node}
                removeLineItem={removeLineItem}
                updateLineItemQuantity={updateLineItemQuantity}
              />
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
