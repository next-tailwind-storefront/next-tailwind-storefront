import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

interface DevelopmentContextValue {
  loading: boolean;
  toggleLoading: () => void;
}

const DevelopmentContext = createContext({} as DevelopmentContextValue);

export function DevelopmentProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);
  const toggleLoading = useCallback(() => {
    setLoading(!loading);
  }, [loading, setLoading]);
  const contextValue = useMemo(
    () => ({
      loading,
      toggleLoading,
    }),
    [loading, toggleLoading]
  );
  return (
    <DevelopmentContext.Provider value={contextValue}>
      {children}
    </DevelopmentContext.Provider>
  );
}

export default DevelopmentContext;
