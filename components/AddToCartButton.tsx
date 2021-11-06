import { ProductVariantFragment } from 'types'
import { Skeleton } from 'components'

export default function AddToCartButton({
  loading,
  variantId,
  addProductVariant,
}: {
  loading?: boolean
  variantId?: ProductVariantFragment['id']
  addProductVariant?: (variantId: ProductVariantFragment['id']) => Promise<void>
}) {
  return (
    <Skeleton active={loading}>
      <button
        className='flex px-6 py-2 ml-auto text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600 skeleton-blocks'
        onClick={() => addProductVariant && variantId && addProductVariant(variantId)}
      >
        Add to Cart
      </button>
    </Skeleton>
  )
}
