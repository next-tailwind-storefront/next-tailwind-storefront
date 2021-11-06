import { CrossIcon } from 'components'

export default function CloseButton({ onClick = () => null }: { onClick?: () => void }) {
  return (
    <button type='button' className='p-2 -m-2 text-gray-400 hover:text-gray-500' onClick={onClick}>
      <span className='sr-only'>Close</span>
      <CrossIcon className='w-6 h-6' />
    </button>
  )
}
