"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useSearch } from "./search-provider"

interface HeaderProps {
  // No props needed anymore as we use context
}

export function Header({}: HeaderProps) {
  const pathname = usePathname()
  const { searchQuery, setSearchQuery, onSearch } = useSearch()
  const [localQuery, setLocalQuery] = useState("")

  const showSearch = pathname === "/"

  useEffect(() => {
    setLocalQuery(searchQuery)
  }, [searchQuery])

  const handleSearch = () => {
    if (onSearch) {
      const queryToSearch = localQuery || ""
      onSearch(queryToSearch)
      setSearchQuery(queryToSearch)
    }
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-3 py-3 flex items-center justify-between gap-4">
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
        
        {showSearch && (
          <div className="flex-1 max-w-2xl flex gap-2">
            <input
              type="text"
              placeholder="Search experiences"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
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
        )}
      </div>
    </header>
  )
}
