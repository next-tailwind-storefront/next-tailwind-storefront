import ProductsContext, { ProductsProvider } from "contexts/products";
import Head from "next/head";
import {
  Layout,
  ProductDetail,
  SkeletonController,
  SkeletonProductDetail,
} from "components";

export default function Index() {
  return (
    <Layout>
      <Head>
        <title>Home - Headless Ecommerce</title>
      </Head>
      <ProductsProvider>
        <SkeletonController
          context={ProductsContext}
          Item={<ProductDetail />}
          Skeleton={<SkeletonProductDetail />}
        />
      </ProductsProvider>
    </Layout>
  );
}
