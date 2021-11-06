export default function QuantityInput({
  min = 0,
  max = 10,
  quantity = 0,
  onChange = () => null,
}: {
  min?: number
  max?: number
  quantity?: number
  onChange?: (quantity: number) => void
}) {
  return (
    <div className='relative flex flex-row h-8 mt-1 flex-0'>
      <button
        className='w-8 h-full text-white bg-indigo-600 rounded-l outline-none cursor-pointer leading-3 active:bg-indigo-700 line-'
        onClick={() => quantity - 1 >= min && onChange(quantity - 1)}
      >
        <span className='m-auto text-sm'>−</span>
      </button>
      <input
        className='flex items-center w-4 h-full text-sm font-thin font-semibold text-center text-white bg-indigo-600 outline-none focus:outline-none md:text-basecursor-default'
        type='number'
        min={min}
        max={max}
        value={quantity}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
      />
      <button
        className='w-8 h-full text-white bg-indigo-600 rounded-r cursor-pointer leading-3 active:bg-indigo-700'
        onClick={() => quantity + 1 <= max && onChange(quantity + 1)}
      >
        <span className='m-auto text-sm'>+</span>
      </button>
    </div>
  )
}
