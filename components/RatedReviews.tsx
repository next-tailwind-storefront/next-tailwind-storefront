import { Rating } from 'components'

export default function RatedReviews() {
  return (
    <span className='flex items-center'>
      <Rating className='w-4 h-4 text-indigo-500 skeleton-figures' value={2} />
      <span className='ml-3 text-gray-600 skeleton-blocks'>4 Reviews</span>
    </span>
  )
}
