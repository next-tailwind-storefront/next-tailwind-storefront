import { useRouter } from 'next/router'
import { LeftArrowIcon } from 'components'

export default function BackButton() {
  const router = useRouter()
  return (
    <div className='relative'>
      <button
        className='px-3 py-2 text-base text-gray-600 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 skeleton-blocks'
        onClick={() => router.back()}
      >
        <LeftArrowIcon className='w-4 h-4' />
      </button>
    </div>
  )
}
