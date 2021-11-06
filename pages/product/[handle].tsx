import { useContext } from 'react'
import Head from 'next/head'
import { ProductContext } from 'contexts'
import { Layout, ProductDetail } from 'components'

export default function Product() {
  const productContext = useContext(ProductContext)
  return (
    <Layout>
      <Head>
        <title>Home - Headless Ecommerce</title>
      </Head>
      <ProductDetail {...productContext} />
    </Layout>
  )
}
