import { gql } from '@apollo/client'

export const IMAGE_FRAGMENT = gql`
  fragment Image on Image {
    id
    width
    height
    altText
    originalSrc
    thumbnailSrc: transformedSrc(maxWidth: 420, maxHeight: 260)
    mediumSrc: transformedSrc(maxWidth: 680, maxHeight: 420)
  }
`

export const PRODUCT_VARIANT_FRAGMENT = gql`
  ${IMAGE_FRAGMENT}
  fragment ProductVariant on ProductVariant {
    id
    title
    availableForSale
    selectedOptions {
      name
      value
    }
    priceV2 {
      currencyCode
      amount
    }
    image {
      ...Image
    }
    product {
      id
      handle
      title
    }
  }
`

export const PRODUCT_FRAGMENT = gql`
  ${IMAGE_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  fragment Product on Product {
    id
    title
    vendor
    handle
    tags
    descriptionHtml
    productType
    vendor
    images(first: 10) {
      edges {
        node {
          ...Image
        }
      }
    }
    variants(first: 10) {
      edges {
        node {
          ...ProductVariant
        }
      }
    }
  }
`

export const AUTOMATIC_DISCOUNT_APPLICATION_FRAGMENT = gql`
  fragment AutomaticDiscountApplication on AutomaticDiscountApplication {
    title
  }
`

export const DISCOUNT_ALLOCATION_FRAGMENT = gql`
  ${AUTOMATIC_DISCOUNT_APPLICATION_FRAGMENT}
  fragment DiscountAllocation on DiscountAllocation {
    discountApplication {
      ...AutomaticDiscountApplication
    }
    allocatedAmount {
      amount
      currencyCode
    }
  }
`

export const CHECKOUT_LINE_ITEM_FRAGMENT = gql`
  ${DISCOUNT_ALLOCATION_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  fragment CheckoutLineItem on CheckoutLineItem {
    id
    quantity
    title
    discountAllocations {
      ...DiscountAllocation
    }
    variant {
      ...ProductVariant
    }
  }
`

export const MAILING_ADDRESS_FRAGMENT = gql`
  fragment MailingAddress on MailingAddress {
    id
    address1
    address2
    city
    country
    firstName
    lastName
    phone
    province
    zip
  }
`

export const CHECKOUT_FRAGMENT = gql`
  ${MAILING_ADDRESS_FRAGMENT}
  ${CHECKOUT_LINE_ITEM_FRAGMENT}
  fragment Checkout on Checkout {
    id
    email
    webUrl
    order {
      id
    }
    shippingAddress {
      ...MailingAddress
    }
    subtotalPriceV2 {
      amount
      currencyCode
    }
    totalTaxV2 {
      amount
      currencyCode
    }
    totalPriceV2 {
      amount
      currencyCode
    }
    lineItems(first: 10) {
      edges {
        node {
          ...CheckoutLineItem
        }
      }
    }
  }
`
