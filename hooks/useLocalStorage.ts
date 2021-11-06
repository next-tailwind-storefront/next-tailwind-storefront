import { useEffect, useState } from 'react'

export default function useLocalStorage<T>(
  key: string,
  initialValue?: T,
  syncInit = false,
): [T | null, (value: T) => void] {
  const readValue = () => {
    if (typeof window === 'undefined') {
      return initialValue ?? null
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue ?? null
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error)
      return initialValue ?? null
    }
  }
  const [storedValue, setStoredValue] = useState<T | null>(syncInit ? readValue() : null)
  const setValue = (value: T) => {
    if (typeof window == 'undefined') {
      console.warn(`Tried setting localStorage key “${key}” even though environment is not a client`)
    }
    try {
      const newValue = value instanceof Function ? value(storedValue) : value
      window.localStorage.setItem(key, JSON.stringify(newValue))
      setStoredValue(newValue)
      window.dispatchEvent(new Event('local-storage'))
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error)
    }
  }
  useEffect(() => {
    setStoredValue(readValue())
  }, [])
  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue())
    }
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('local-storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('local-storage', handleStorageChange)
    }
  }, [])
  return [storedValue, setValue]
}

export function useSyncLocalStorage<T>(key: string, initialValue?: T): [T | null, (value: T) => void] {
  return useLocalStorage<T>(key, initialValue, true)
}
