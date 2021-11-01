import ProductsContext, { ProductsProvider } from "contexts/products";
import Head from "next/head";
import {
  Grid,
  GridProduct,
  GridSkeletonProduct,
  Layout,
  SkeletonController,
} from "components";

export default function Index() {
  return (
    <Layout>
      <Head>
        <title>Home - Headless Ecommerce</title>
      </Head>
      <ProductsProvider>
        <SkeletonController
          Item={<GridProduct />}
          Skeleton={<GridSkeletonProduct />}
          context={ProductsContext}
        >
          <Grid />
        </SkeletonController>
      </ProductsProvider>
    </Layout>
  );
}
