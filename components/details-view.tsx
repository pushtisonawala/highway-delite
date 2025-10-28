"use client"

import Image from "next/image"
import type { Experience, Slot } from "@/lib/types"

interface DetailsViewProps {
  experience: Experience
  slots: Slot[]
  selectedSlot: Slot | null
  quantity: number
  onSlotChange: (slot: Slot) => void
  onQuantityChange: (qty: number) => void
}

export function DetailsView({
  experience,
  slots,
  selectedSlot,
  quantity,
  onSlotChange,
  onQuantityChange,
}: DetailsViewProps) {
  // Group slots by date
  const slotsByDate = slots.reduce((acc, slot) => {
    const date = new Date(slot.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(slot)
    return acc
  }, {} as Record<string, Slot[]>)

  const dates = Object.keys(slotsByDate)
  const [selectedDate, setSelectedDate] = React.useState(dates[0])

  const availableTimes = selectedDate ? slotsByDate[selectedDate] : []

  const handleDateChange = (date: string) => {
    setSelectedDate(date)
    // Auto-select first slot of the new date
    const firstSlot = slotsByDate[date]?.[0]
    if (firstSlot) {
      onSlotChange(firstSlot)
    }
  }

  const handleTimeChange = (slot: Slot) => {
    onSlotChange(slot)
  }

  return (
    <div className="space-y-6">
      <div className="relative h-80 bg-gray-200 rounded-lg overflow-hidden">
        <Image src={experience.image || "/placeholder.svg"} alt={experience.title} fill className="object-cover" />
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{experience.title}</h1>
        <p className="text-gray-600">{experience.description}</p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Choose date</h3>
        {dates.length === 0 ? (
          <p className="text-gray-500 text-sm">No available dates</p>
        ) : (
          <div className="flex gap-2 flex-wrap">
            {dates.map((date) => (
              <button
                key={date}
                onClick={() => handleDateChange(date)}
                className={`px-4 py-2 rounded font-medium transition ${
                  selectedDate === date ? "bg-yellow-400 text-gray-900" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {date}
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Choose time</h3>
        {availableTimes.length === 0 ? (
          <p className="text-gray-500 text-sm">No available times</p>
        ) : (
          <div className="flex gap-2 flex-wrap">
            {availableTimes.map((slot) => {
              const availableSpots = slot.capacity - slot.booked
              const isAvailable = availableSpots > 0
              
              return (
                <button
                  key={slot.id}
                  onClick={() => isAvailable && handleTimeChange(slot)}
                  disabled={!isAvailable}
                  className={`px-4 py-2 rounded font-medium transition ${
                    selectedSlot?.id === slot.id
                      ? "bg-yellow-400 text-gray-900"
                      : isAvailable
                      ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span>{slot.startTime}</span>
                    <span className="text-xs">({availableSpots} spots)</span>
                  </div>
                </button>
              )
            })}
          </div>
        )}
        <p className="text-xs text-gray-500 mt-2">All times are in IST (GMT +5:30)</p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">About</h3>
        <p className="text-sm text-gray-600">Scenic routes, trained guides, and safety briefing. Minimum age 10.</p>
      </div>
    </div>
  )
}

// Import React for useState
import React from "react"
