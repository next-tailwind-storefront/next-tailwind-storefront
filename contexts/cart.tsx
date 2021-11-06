import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useMemo, useState } from 'react'
import { ApolloCache, FetchResult, useMutation, useQuery } from '@apollo/client'
import { Getter, lens } from 'proxy-lens'
import {
  CheckoutCreateMutation,
  CheckoutFragment,
  CheckoutLineItemFragment,
  CheckoutLineItemsAddMutation,
  CheckoutLineItemsUpdateMutation,
  CheckoutQuery,
  Expand,
  LoaderContextProps,
  Optional,
  ProductVariantFragment,
} from 'types'
import { useApolloDebounceKey, useLocalStorage } from 'hooks'
import { CHECKOUT_FRAGMENT } from 'graphql/fragments'
import { CHECKOUT_LINE_ITEMS_ADD, CHECKOUT_LINE_ITEMS_UPDATE, CREATE_CHECKOUT } from 'graphql/mutations'
import { CHECKOUT } from 'graphql/queries'
import { CURRENT_CHECKOUT_ID_KEY } from 'consts'
import { DevelopmentContext } from './development'

interface CartContextProps extends LoaderContextProps<CheckoutFragment> {
  cartOpen: boolean
  setCartOpen: Dispatch<SetStateAction<boolean>>
  addProductVariant(variantId: ProductVariantFragment['id']): Promise<void>
  removeLineItem(lineItemId: CheckoutLineItemFragment['id']): Promise<void>
  updateLineItemQuantity(lineItemId: CheckoutLineItemFragment['id'], quantity: number): Promise<void>
}

export const CartContext = createContext({} as Expand<CartContextProps>)

function updateCachedCheckoutFromMutation<T>(resultGetter: Getter<Optional<T>, Optional<CheckoutFragment>>) {
  return (cache: ApolloCache<CheckoutFragment>, { data }: FetchResult<T>) => {
    const checkout = resultGetter(data)
    if (checkout) {
      cache.writeFragment({
        id: cache.identify(checkout),
        data: checkout,
        fragmentName: 'Checkout',
        fragment: CHECKOUT_FRAGMENT,
      })
    }
  }
}

function findIndexForLineItemId(checkout: CheckoutFragment, lineItemId: CheckoutLineItemFragment['id']): number {
  return checkout.lineItems.edges.findIndex(({ node }) => node.id === lineItemId)
}

function getCheckoutSubtotalPriceAmount(checkout: CheckoutFragment): number {
  return checkout.lineItems.edges.reduce(
    (sum: number, { node }) => sum + node?.variant?.priceV2.amount * node?.quantity,
    0,
  )
}

const updateCheckoutSubtotalPriceAmountMod =
  lens<CheckoutFragment>().subtotalPriceV2.amount.peg(getCheckoutSubtotalPriceAmount)

export function CartProvider({ children }: { children?: ReactNode }) {
  const [currentCheckoutId, setCurrentCheckoutId] = useLocalStorage<Optional<string>>(CURRENT_CHECKOUT_ID_KEY)
  const { loading: dataLoading, data } = useQuery<CheckoutQuery>(CHECKOUT, {
    variables: { id: currentCheckoutId },
    skip: !currentCheckoutId,
    onCompleted(data) {
      if (data?.node) {
        const checkout = data.node as CheckoutFragment
        if (checkout.id !== currentCheckoutId) {
          if (checkout.order?.id) {
            setCurrentCheckoutId(null)
          } else {
            setCurrentCheckoutId(checkout.id)
          }
        }
      } else if (data && !dataLoading) {
        setCurrentCheckoutId(null)
      }
    },
  })
  const checkout = useMemo(() => data?.node as CheckoutFragment, [data?.node])
  const { forcedLoading } = useContext(DevelopmentContext)
  const loading = useMemo(() => dataLoading || forcedLoading, [dataLoading, forcedLoading])
  const [cartOpen, setCartOpen] = useState(false)
  const mutationDebounceKey = useApolloDebounceKey()
  const [createCheckout] = useMutation<CheckoutCreateMutation>(CREATE_CHECKOUT, mutationDebounceKey)
  const [addCheckoutLineItem] = useMutation<CheckoutLineItemsAddMutation>(CHECKOUT_LINE_ITEMS_ADD, {
    ...mutationDebounceKey,
    update: updateCachedCheckoutFromMutation(
      lens<Optional<CheckoutLineItemsAddMutation>>().checkoutLineItemsAdd.checkout.get,
    ),
  })
  const [updateCheckoutLineItem] = useMutation<CheckoutLineItemsUpdateMutation>(CHECKOUT_LINE_ITEMS_UPDATE, {
    ...mutationDebounceKey,
    update: updateCachedCheckoutFromMutation(
      lens<Optional<CheckoutLineItemsUpdateMutation>>().checkoutLineItemsUpdate.checkout.get,
    ),
  })
  const addProductVariant = useCallback(
    async (variantId: ProductVariantFragment['id']) => {
      if (!checkout) {
        await createCheckout({
          variables: {
            lineItems: [{ variantId, quantity: 1 }],
          },
        }).then(({ data }) => {
          if (data?.checkoutCreate?.checkout) {
            setCurrentCheckoutId(data.checkoutCreate.checkout.id)
            setCartOpen(true)
          }
        })
      } else {
        await addCheckoutLineItem({
          variables: {
            id: checkout.id,
            lineItems: [{ variantId, quantity: 1 }],
          },
        }).then(() => setCartOpen(true))
      }
    },
    [checkout, addCheckoutLineItem, createCheckout],
  )
  const removeLineItem = useCallback(
    async (lineItemId: CheckoutLineItemFragment['id']) => {
      if (checkout) {
        updateCheckoutLineItem({
          variables: {
            id: checkout.id,
            lineItems: [{ id: lineItemId, quantity: 0 }],
          },
          optimisticResponse: lens<CheckoutLineItemsUpdateMutation>().checkoutLineItemsUpdate.checkout.set(
            lens(checkout)
              .lineItems.edges.del(findIndexForLineItemId(checkout, lineItemId))
              .mod(updateCheckoutSubtotalPriceAmountMod)
              .get(),
          ),
        })
      }
    },
    [checkout, updateCheckoutLineItem],
  )
  const updateLineItemQuantity = useCallback(
    async (lineItemId: CheckoutLineItemFragment['id'], quantity: number) => {
      if (checkout) {
        updateCheckoutLineItem({
          variables: {
            id: checkout.id,
            lineItems: [{ id: lineItemId, quantity }],
          },
          optimisticResponse: lens<CheckoutLineItemsUpdateMutation>().checkoutLineItemsUpdate.checkout.set(
            lens(checkout)
              .lineItems.edges[findIndexForLineItemId(checkout, lineItemId)].node.quantity.let(quantity)
              .mod(updateCheckoutSubtotalPriceAmountMod)
              .get(),
          ),
        })
      }
    },
    [checkout, updateCheckoutLineItem],
  )
  const contextValue = useMemo(
    () => ({
      size: 1,
      loading,
      nodes: [checkout],
      cartOpen,
      setCartOpen,
      addProductVariant,
      removeLineItem,
      updateLineItemQuantity,
    }),
    [loading, checkout, cartOpen, setCartOpen, addProductVariant, removeLineItem, updateLineItemQuantity],
  )
  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}
