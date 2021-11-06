export default function CrossIcon({ className }: { className?: string }) {
  return (
    <svg
      fill='currentColor'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      className={className}
      viewBox='0 0 24 24'
    >
      <path d='M6 18L18 6M6 6l12 12'></path>
    </svg>
  )
}
