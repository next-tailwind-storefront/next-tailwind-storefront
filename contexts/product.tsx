import { createContext, ReactNode, useContext, useMemo } from 'react'
import { first } from 'lodash'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { Expand, LoaderContextProps, ProductFragment, ProductQuery } from 'types'
import { PRODUCT } from 'graphql/queries'
import { DevelopmentContext } from './development'

export const ProductContext = createContext({} as Expand<LoaderContextProps<ProductFragment>>)

export function ProductProvider({ children }: { children?: ReactNode }) {
  const { query } = useRouter()
  const handle = useMemo(() => (Array.isArray(query.handle) ? first(query.handle) : query.handle), [query])
  const { loading: dataLoading, data } = useQuery<ProductQuery>(PRODUCT, {
    variables: {
      handle: handle ?? '',
    },
    skip: !handle,
  })
  const { forcedLoading } = useContext(DevelopmentContext)
  const loading = useMemo(() => dataLoading || forcedLoading, [dataLoading, forcedLoading])
  const nodes = useMemo(() => (data?.product ? [data.product] : []), [data])
  const contextValue = useMemo(
    () => ({
      size: 1,
      loading,
      nodes,
    }),
    [loading, nodes],
  )
  return <ProductContext.Provider value={contextValue}>{children}</ProductContext.Provider>
}
