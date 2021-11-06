import { useContext } from 'react'
import Head from 'next/head'
import { ProductContext } from 'contexts'
import { Layout, ProductDetail, Single } from 'components'

export default function Index() {
  const productContext = useContext(ProductContext)
  return (
    <Layout>
      <Head>
        <title>Home - Headless Ecommerce</title>
      </Head>
      <Single {...productContext}>
        <ProductDetail />
      </Single>
    </Layout>
  )
}
