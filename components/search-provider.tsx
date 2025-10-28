"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface SearchContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  onSearch?: (query: string) => void
  setOnSearch: (handler: ((query: string) => void) | undefined) => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [onSearch, setOnSearch] = useState<((query: string) => void) | undefined>()

  return (
    <SearchContext.Provider value={{
      searchQuery,
      setSearchQuery,
      onSearch,
      setOnSearch,
    }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}