"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

interface HeaderProps {
  onSearch?: (query: string) => void
}

export function Header({ onSearch }: HeaderProps) {
  const [query, setQuery] = useState("")

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query)
    }
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-2 py-2 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image 
            src="/logo.jpg" 
            alt="Highway Delite Logo" 
            width={120} 
            height={120}
            className="h-16 w-auto object-contain"
            quality={100}
            priority
          />
        </Link>
        
        <div className="flex-1 max-w-2xl flex gap-2">
          <input
            type="text"
            placeholder="Search experiences"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-1.5 text-sm bg-yellow-400 text-gray-900 rounded font-medium hover:bg-yellow-500 transition"
          >
            Search
          </button>
        </div>
      </div>
    </header>
  )
}
