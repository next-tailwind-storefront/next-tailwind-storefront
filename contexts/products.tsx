import { createContext, ReactNode, useContext, useMemo } from 'react'
import { last } from 'lodash'
import { useQuery } from '@apollo/client'
import { Expand, LoaderContextProps, ProductFragment, ProductsQuery } from 'types'
import { PRODUCTS } from 'graphql/queries'
import { DevelopmentContext } from './development'

const BATCH_SIZE = 8

export const ProductsContext = createContext({} as Expand<LoaderContextProps<ProductFragment>>)

export function ProductsProvider({ children }: { children?: ReactNode }) {
  const {
    loading: dataLoading,
    data,
    fetchMore,
  } = useQuery<ProductsQuery>(PRODUCTS, {
    notifyOnNetworkStatusChange: true,
    variables: { first: BATCH_SIZE },
    onCompleted() {
      if (data?.products.pageInfo.hasNextPage) {
        fetchMore({
          variables: {
            after: last(data.products.edges)?.cursor,
          },
        })
      }
    },
  })
  const { forcedLoading } = useContext(DevelopmentContext)
  const loading = useMemo(() => dataLoading || forcedLoading, [dataLoading, forcedLoading])
  const nodes = useMemo(
    () => (!forcedLoading ? data?.products.edges.map(({ node }) => node) ?? [] : []),
    [forcedLoading, data],
  )
  const contextValue = useMemo(
    () => ({
      size: BATCH_SIZE,
      loading,
      nodes,
    }),
    [loading, nodes],
  )
  return <ProductsContext.Provider value={contextValue}>{children}</ProductsContext.Provider>
}
