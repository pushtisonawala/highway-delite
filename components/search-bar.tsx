"use client"

import { useState } from "react"

interface SearchBarProps {
  onSearch: (query: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSearch = () => {
    onSearch(query)
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Search experiences"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        className="flex-1 px-4 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500"
      />
      <button
        onClick={handleSearch}
        className="px-6 py-2 bg-yellow-400 text-gray-900 rounded font-medium hover:bg-yellow-500 transition"
      >
        Search
      </button>
    </div>
  )
}
