import { StarIcon } from 'components'

export default function Rating({ value, className }: { value: number; className?: string }) {
  return (
    <>
      <StarIcon className={className} fill={value >= 1} />
      <StarIcon className={className} fill={value >= 2} />
      <StarIcon className={className} fill={value >= 3} />
      <StarIcon className={className} fill={value >= 4} />
      <StarIcon className={className} fill={value >= 5} />
    </>
  )
}
