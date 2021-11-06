import { Children, cloneElement, ReactElement } from 'react'
import { first } from 'lodash'
import { LoaderContextProps, ProductFragment } from 'types'

export default function Single({
  loading,
  nodes,
  children,
}: {
  children?: ReactElement
} & Partial<LoaderContextProps<ProductFragment>>) {
  return children ? (
    <>
      {Children.map(children, (child) =>
        loading ? cloneElement(child, { loading, node: null }) : cloneElement(child, { loading, node: first(nodes) }),
      )}
    </>
  ) : null
}
