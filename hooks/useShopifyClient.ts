import { useMemo } from 'react'
import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { relayStylePagination } from '@apollo/client/utilities'
import DebounceLink from 'apollo-link-debounce'

const DEFAULT_DEBOUNCE_TIMEOUT = 100

export default function useShopifyClient() {
  return useMemo(
    () =>
      new ApolloClient({
        queryDeduplication: false,
        ssrMode: typeof window === 'undefined',
        link: setContext((_: unknown, { headers, locale }: { headers: Record<string, string>; locale: string }) => ({
          headers: {
            ...headers,
            'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
            'Accept-Language': locale,
          },
        })).concat(
          from([
            new DebounceLink(DEFAULT_DEBOUNCE_TIMEOUT),
            new HttpLink({
              uri: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_URI,
            }),
          ]),
        ),
        cache: new InMemoryCache({
          typePolicies: {
            Query: {
              fields: {
                products: relayStylePagination(['query', 'first', 'reverse', 'sortKey']),
              },
            },
            Checkout: {
              fields: {
                lineItems: relayStylePagination(['first']),
              },
            },
          },
        }),
      }),
    [],
  )
}
