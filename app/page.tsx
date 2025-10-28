"use client"

import { useState } from "react"
import { ExperienceCard } from "@/components/experience-card"
import { Header } from "@/components/header"
import { MOCK_EXPERIENCES } from "@/lib/mock-data"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredExperiences, setFilteredExperiences] = useState(MOCK_EXPERIENCES)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setFilteredExperiences(MOCK_EXPERIENCES)
    } else {
      const filtered = MOCK_EXPERIENCES.filter(
        (exp) =>
          exp.title.toLowerCase().includes(query.toLowerCase()) ||
          exp.location.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredExperiences(filtered)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredExperiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </div>
    </main>
  )
}
