export type Optional<T> = T | null | undefined

export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never
