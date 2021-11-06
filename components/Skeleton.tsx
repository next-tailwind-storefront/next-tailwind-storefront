import { cloneElement, isValidElement, ReactElement } from 'react'

export default function Skeleton({ active, children }: { active?: boolean; children?: ReactElement }) {
  return isValidElement(children)
    ? cloneElement(children, {
        ...children.props,
        className: `${children.props.className} ${active ? 'skeleton' : ''}`,
      })
    : null
}
