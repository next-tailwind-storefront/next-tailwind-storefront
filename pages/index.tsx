import { useContext, useMemo } from 'react'
import Head from 'next/head'
import { ProductsContext } from 'contexts'
import { GridProduct, Layout } from 'components'

export default function Index() {
  const { size, loading, nodes } = useContext(ProductsContext)
  const loadingNodes = useMemo(() => new Array(size ?? 0).fill(null), [size])
  return (
    <Layout>
      <Head>
        <title>Home - Headless Ecommerce</title>
      </Head>
      <section className='text-gray-600 body-font'>
        <div className='container px-5 mx-auto'>
          <div className='flex flex-wrap -m-4'>
            {(loading ? [...nodes, ...loadingNodes] : nodes).map((node, index) => (
              <GridProduct key={node?.id ?? `${index}`} loading={node ? false : loading} node={node} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
