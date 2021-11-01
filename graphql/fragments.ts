import { gql } from "@apollo/client";

export const IMAGE_FRAGMENT = gql`
  fragment Image on Image {
    id
    width
    height
    altText
    originalSrc
    thumbnailSrc: transformedSrc(maxWidth: 420, maxHeight: 260)
  }
`;

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
`;

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
`;
