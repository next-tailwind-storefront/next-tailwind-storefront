import { gql } from '@apollo/client'
import { CHECKOUT_FRAGMENT } from './fragments'

export const CREATE_CHECKOUT = gql`
  mutation checkoutCreate($lineItems: [CheckoutLineItemInput!]) {
    checkoutCreate(input: { lineItems: $lineItems }) {
      checkout {
        ...Checkout
      }
    }
  }
  ${CHECKOUT_FRAGMENT}
`

export const CHECKOUT_LINE_ITEMS_ADD = gql`
  mutation checkoutLineItemsAdd($id: ID!, $lineItems: [CheckoutLineItemInput!]!) {
    checkoutLineItemsAdd(checkoutId: $id, lineItems: $lineItems) {
      checkout {
        ...Checkout
      }
    }
  }
  ${CHECKOUT_FRAGMENT}
`

export const CHECKOUT_LINE_ITEMS_UPDATE = gql`
  mutation checkoutLineItemsUpdate($id: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
    checkoutLineItemsUpdate(checkoutId: $id, lineItems: $lineItems) {
      checkout {
        ...Checkout
      }
    }
  }
  ${CHECKOUT_FRAGMENT}
`
