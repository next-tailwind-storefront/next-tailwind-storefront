import { Dispatch, SetStateAction } from 'react'

export default function ToggleLoadingButton({
  forcedLoading,
  setForcedLoading = () => null,
}: {
  forcedLoading?: boolean
  setForcedLoading?: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <button
      className='inline-flex items-center px-3 py-1 text-base bg-gray-100 border-0 rounded focus:outline-none hover:bg-gray-200 md:mt-0'
      onClick={() => setForcedLoading(!forcedLoading)}
    >
      Toggle Loading
    </button>
  )
}
