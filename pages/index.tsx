import { useContext } from 'react'
import Head from 'next/head'
import { ProductsContext } from 'contexts'
import { Grid, GridProduct, Layout } from 'components'

export default function Index() {
  const productsContext = useContext(ProductsContext)
  return (
    <Layout>
      <Head>
        <title>Home - Headless Ecommerce</title>
      </Head>
      <Grid {...productsContext}>
        <GridProduct />
      </Grid>
    </Layout>
  )
}
