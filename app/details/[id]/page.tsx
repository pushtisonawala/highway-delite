"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { DetailsView } from "@/components/details-view"
import { PriceSummary } from "@/components/price-summary"
import { api } from "@/lib/api"
import type { Experience, Slot } from "@/lib/types"

export default function DetailsPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [experience, setExperience] = useState<Experience | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const data = await api.getExperienceById(id)
        setExperience(data)
        // Auto-select first available slot
        if (data.slots && data.slots.length > 0) {
          setSelectedSlot(data.slots[0])
        }
      } catch (error) {
        console.error("Failed to fetch experience:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchExperience()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  if (!experience) {
    return <div className="text-center py-12">Experience not found</div>
  }

  const handleCheckout = () => {
    if (!selectedSlot) {
      alert("Please select a time slot")
      return
    }
    router.push(`/checkout?experience=${id}&slotId=${selectedSlot.id}&qty=${quantity}`)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900 mb-6 flex items-center gap-2"
        >
          ← Details
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <DetailsView
              experience={experience}
              slots={experience.slots || []}
              selectedSlot={selectedSlot}
              quantity={quantity}
              onSlotChange={setSelectedSlot}
              onQuantityChange={setQuantity}
            />
          </div>

          <div className="lg:col-span-1">
            <PriceSummary
              price={experience.price}
              quantity={quantity}
              onConfirm={handleCheckout}
              buttonText="Confirm"
            />
          </div>
        </div>
      </div>
    </main>
  )
}
