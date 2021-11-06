import { ReactNode } from 'react'
import { DownArrowIcon } from 'components'

export default function SelectBox({ children }: { children: ReactNode }) {
  return (
    <div className='relative'>
      <select className='py-2 pl-3 pr-10 text-base border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 skeleton-blocks'>
        {children}
      </select>
      <span className='absolute top-0 right-0 flex items-center justify-center w-10 h-full text-center text-gray-600 pointer-events-none skeleton-blocks'>
        <DownArrowIcon className='w-4 h-4' />
      </span>
    </div>
  )
}
