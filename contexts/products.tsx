import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { first, last } from "lodash";
import { QueryResult, useQuery } from "@apollo/client";
import DevelopmentContext from "contexts/development";
import { PRODUCTS } from "graphql/queries";
import { useRouter } from "next/router";
import {
  ProductFragment,
  ProductsQuery,
  ProductsQueryVariables,
} from "types/graphql";

export interface ProductsContextProps
  extends QueryResult<ProductsQuery, ProductsQueryVariables> {
  nodes: ProductFragment[];
  variables: ProductsQueryVariables;
  setVariables: Dispatch<SetStateAction<ProductsQueryVariables>>;
}

const ProductsContext = createContext({} as ProductsContextProps);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const { query } = useRouter();
  const productId = useMemo(() => first(query?.productId), [query]);
  const [variables, setVariables] = useState<ProductsQueryVariables>({
    query: productId ?? "",
    first: 8,
  });
  const { loading, data, fetchMore, ...productsQuery } =
    useQuery<ProductsQuery>(PRODUCTS, {
      notifyOnNetworkStatusChange: true,
      variables,
      onCompleted() {
        if (data?.products.pageInfo.hasNextPage) {
          fetchMore({
            variables: {
              after: last(data.products.edges)?.cursor,
            },
          });
        }
      },
    });
  const { loading: developmentLoading } = useContext(DevelopmentContext);
  const nodes = useMemo(
    () => data?.products.edges.map(({ node }) => node) ?? [],
    [data]
  );
  const contextValue = useMemo(
    () => ({
      ...productsQuery,
      loading: loading || developmentLoading,
      nodes,
      data,
      fetchMore,
      variables,
      setVariables,
    }),
    [
      productsQuery,
      loading,
      developmentLoading,
      nodes,
      data,
      fetchMore,
      variables,
    ]
  );
  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductsContext;
