import { useContext } from 'react'
import { DevelopmentContext } from 'contexts'
import { ToggleLoadingButton } from 'components'

export default function Header() {
  const developmentContext = useContext(DevelopmentContext)
  return (
    <header className='text-gray-600 body-font'>
      <div className='container flex flex-row flex-wrap items-center justify-between w-full p-5 mx-auto'>
        <a className='flex items-center font-medium text-gray-900 title-font'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            className='w-10 h-10 p-2 text-white bg-indigo-500 rounded-full'
            viewBox='0 0 24 24'
          >
            <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'></path>
          </svg>
          <span className='ml-3 text-xl'>Tailblocks</span>
        </a>
        <ToggleLoadingButton {...developmentContext} />
      </div>
    </header>
  )
}
