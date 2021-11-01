import { gql } from "@apollo/client";
import { PRODUCT_FRAGMENT } from "./fragments";

export const SHOP = gql`
  query shop {
    shop {
      name
    }
  }
`;

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
`;
