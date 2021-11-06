import { gql } from '@apollo/client'
import { CHECKOUT_FRAGMENT, PRODUCT_FRAGMENT } from './fragments'

export const PRODUCTS = gql`
  query products(
    $query: String
    $first: Int
    $last: Int
    $after: String
    $before: String
    $reverse: Boolean
    $sortKey: ProductSortKeys
  ) {
    products(
      first: $first
      last: $last
      after: $after
      before: $before
      query: $query
      reverse: $reverse
      sortKey: $sortKey
    ) {
      edges {
        cursor
        node {
          ...Product
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`

export const PRODUCT = gql`
  query product($handle: String!) {
    product: productByHandle(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`

export const CHECKOUT = gql`
  query checkout($id: ID!) {
    node(id: $id) {
      ...Checkout
    }
  }
  ${CHECKOUT_FRAGMENT}
`
