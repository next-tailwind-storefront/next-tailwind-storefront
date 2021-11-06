import { createContext, Dispatch, ReactNode, SetStateAction, useMemo, useState } from 'react'
import { Expand } from 'types'

interface DevelopmentContextProps {
  forcedLoading: boolean
  setForcedLoading: Dispatch<SetStateAction<boolean>>
}

export const DevelopmentContext = createContext({} as Expand<DevelopmentContextProps>)

export function DevelopmentProvider({ children }: { children?: ReactNode }) {
  const [forcedLoading, setForcedLoading] = useState(false)
  const contextValue = useMemo(
    () => ({
      forcedLoading,
      setForcedLoading,
    }),
    [forcedLoading, setForcedLoading],
  )
  return <DevelopmentContext.Provider value={contextValue}>{children}</DevelopmentContext.Provider>
}
