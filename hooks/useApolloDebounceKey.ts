import { useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function useApolloDebounceKey(): {
  context: { debounceKey: string }
} {
  const debounceKey = useMemo(() => uuidv4(), [])
  return {
    context: { debounceKey },
  }
}
