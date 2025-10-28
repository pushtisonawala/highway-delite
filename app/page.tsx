"use client"

import { useState, useEffect } from "react"
import { ExperienceCard } from "@/components/experience-card"
import { useSearch } from "@/components/search-provider"
import { api } from "@/lib/api"
import { MOCK_EXPERIENCES } from "@/lib/mock-data"
import type { Experience } from "@/lib/types"

export default function Home() {
  const { setOnSearch } = useSearch()
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setError(null)
        const data = await api.getExperiences()
        setExperiences(data)
        setFilteredExperiences(data)
      } catch (error) {
        console.error("Failed to fetch experiences:", error)
        setError(error instanceof Error ? error.message : 'Failed to load experiences')
        // Fallback to mock data
        setExperiences(MOCK_EXPERIENCES)
        setFilteredExperiences(MOCK_EXPERIENCES)
      } finally {
        setLoading(false)
      }
    }

    fetchExperiences()
  }, [])

  const handleSearch = (query: string) => {
    const searchTerm = query || ""
    if (searchTerm.trim() === "") {
      setFilteredExperiences(experiences)
    } else {
      const filtered = experiences.filter(
        (exp) =>
          exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exp.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredExperiences(filtered)
    }
  }

  // Set the search handler in the context
  useEffect(() => {
    setOnSearch(handleSearch)
  }, [experiences, setOnSearch])

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4 text-sm">
            <strong>API Error:</strong> {error}
            <br />
            <small>Using fallback data for testing</small>
          </div>
        )}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading experiences...</p>
          </div>
        ) : filteredExperiences.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No experiences found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {filteredExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
