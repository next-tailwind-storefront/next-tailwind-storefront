import { Optional } from 'types'

export interface ItemLoaderContextProps<NodeType> {
  size: number
  loading: boolean
  node?: Optional<NodeType>
}

export interface CollectionLoaderContextProps<NodeType> {
  size: number
  loading: boolean
  nodes: NodeType[]
}
