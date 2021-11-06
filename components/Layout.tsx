import { ReactNode, useContext } from 'react'
import { CartContext } from 'contexts'
import { Cart, Header } from 'components'

export default function Layout({ children }: { children: ReactNode }) {
  const cartContext = useContext(CartContext)
  return (
    <div style={{ paddingLeft: 'calc(100vw - 100%)' }}>
      <Cart {...cartContext} />
      <Header />
      {children}
    </div>
  )
}
