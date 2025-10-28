"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import type { Experience } from "@/lib/types"

interface ExperienceCardProps {
  experience: Experience
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const router = useRouter()

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      router.push(`/details/${experience.id}`)
    } catch (error) {
      console.error('Navigation error:', error)
      // Fallback to window.location for compatibility
      window.location.href = `/details/${experience.id}`
    }
  }

  return (
    <div
      className="bg-white rounded-lg overflow-hidden border-2 border-gray-200 hover:shadow-lg transition cursor-pointer"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick(e as any)
        }
      }}
    >
      <div className="relative h-40 bg-gray-200">
        <Image src={experience.image || "/placeholder.svg"} alt={experience.title} fill className="object-cover" />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{experience.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{experience.location}</p>
        <p className="text-xs text-gray-500 mb-4 line-clamp-2">{experience.description}</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-600">From</p>
            <p className="text-lg font-bold text-gray-900">₹{experience.price}</p>
          </div>
          <button className="px-3 py-1 bg-yellow-400 text-gray-900 text-sm font-medium rounded hover:bg-yellow-500 transition">
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}
