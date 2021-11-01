import {
  Children,
  cloneElement,
  Context,
  ReactElement,
  useContext,
  useMemo,
} from "react";
import { ProductsContextProps } from "contexts/products";

export default function SkeletonController({
  Item,
  Skeleton,
  context,
  children,
}: {
  Item: ReactElement<{ node: unknown }>;
  Skeleton: ReactElement;
  context: Context<ProductsContextProps>;
  children?: ReactElement;
}) {
  const { nodes, loading, variables } = useContext(context);
  const skeletonItems = useMemo(
    () =>
      Array.from({ length: variables?.first ?? 0 }, (_, index) =>
        cloneElement(Skeleton, { key: index })
      ),
    [Skeleton, variables]
  );
  const items = useMemo(
    () => nodes.map((node) => cloneElement(Item, { key: node.id, node })),
    [Item, nodes]
  );
  return children ? (
    <>
      {Children.map(children, (child) =>
        cloneElement(child, {
          children: [items, loading ? skeletonItems : null],
        })
      )}
    </>
  ) : (
    <>
      {items}
      {loading ? skeletonItems : null}
    </>
  );
}
