"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { DetailsView } from "@/components/details-view"
import { PriceSummary } from "@/components/price-summary"
import { MOCK_EXPERIENCES } from "@/lib/mock-data"

export default function DetailsPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const experience = MOCK_EXPERIENCES.find((exp) => exp.id === id)
  const [selectedDate, setSelectedDate] = useState("Oct 22")
  const [selectedTime, setSelectedTime] = useState("09:00 am")
  const [quantity, setQuantity] = useState(1)

  if (!experience) {
    return <div className="text-center py-12">Experience not found</div>
  }

  const handleCheckout = () => {
    router.push(`/checkout?experience=${id}&date=${selectedDate}&time=${selectedTime}&qty=${quantity}`)
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
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              quantity={quantity}
              onDateChange={setSelectedDate}
              onTimeChange={setSelectedTime}
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
