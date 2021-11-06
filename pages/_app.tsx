import { JSXElementConstructor, PropsWithChildren, ReactNode } from 'react'
import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import { useShopifyClient } from 'hooks'
import { CartProvider, DevelopmentProvider, ProductProvider, ProductsProvider } from 'contexts'

import 'tailwindcss/tailwind.css'
import 'styles/skeleton.css'
import 'styles/reset.css'

function Compose({
  components = [],
  children,
}: {
  components: JSXElementConstructor<PropsWithChildren<unknown>>[]
  children: ReactNode
}) {
  return (
    <>
      {components.reduceRight(
        (components, Component) => (
          <Component>{components}</Component>
        ),
        children,
      )}
    </>
  )
}

function App({ Component, pageProps }: AppProps) {
  const client = useShopifyClient()
  return (
    <ApolloProvider client={client}>
      <DevelopmentProvider>
        <Compose components={[ProductsProvider, ProductProvider, CartProvider]}>
          <Component {...pageProps} />;
        </Compose>
      </DevelopmentProvider>
    </ApolloProvider>
  )
}

export default App
