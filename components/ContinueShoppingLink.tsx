export default function ContinueShoppingLink({ onClick = () => null }: { onClick?: () => void }) {
  return (
    <div className='flex justify-center mt-6 text-sm text-center text-gray-500'>
      <p>
        or{' '}
        <button type='button' className='font-medium text-indigo-600 hover:text-indigo-500' onClick={onClick}>
          Continue Shopping<span aria-hidden='true'> &rarr;</span>
        </button>
      </p>
    </div>
  )
}
