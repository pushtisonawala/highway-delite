"use client"

import { useState, useEffect } from "react"
import { ExperienceCard } from "@/components/experience-card"
import { useSearch } from "@/components/search-provider"
import { api } from "@/lib/api"
import type { Experience } from "@/lib/types"

export default function Home() {
  const { setOnSearch } = useSearch()
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await api.getExperiences()
        setExperiences(data)
        setFilteredExperiences(data)
      } catch (error) {
        console.error("Failed to fetch experiences:", error)
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading experiences...</p>
          </div>
        ) : filteredExperiences.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No experiences found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
