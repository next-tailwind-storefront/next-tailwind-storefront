import { Children, cloneElement, ReactElement, useMemo } from 'react'
import { LoaderContextProps, ProductFragment } from 'types'

export default function Grid({
  size,
  loading,
  nodes = [],
  children,
}: {
  children?: ReactElement
} & Partial<LoaderContextProps<ProductFragment>>) {
  const loadingNodes = useMemo(() => new Array(size ?? 0).fill(null), [size])
  const items = useMemo(
    () =>
      children
        ? Children.map(children, (child) =>
            (loading ? [...nodes, ...loadingNodes] : nodes).map((node, index) =>
              cloneElement(child, {
                key: node?.id ?? `${index}`,
                loading: node ? false : loading,
                node,
              }),
            ),
          )
        : [],
    [children, loading, loadingNodes, nodes],
  )
  return children ? (
    <section className='text-gray-600 body-font'>
      <div className='container px-5 py-24 mx-auto'>
        <div className='flex flex-wrap -m-4'>{items}</div>
      </div>
    </section>
  ) : null
}
