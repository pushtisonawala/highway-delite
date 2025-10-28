"use client"

import Image from "next/image"
import type { Experience } from "@/lib/types"

interface DetailsViewProps {
  experience: Experience
  selectedDate: string
  selectedTime: string
  quantity: number
  onDateChange: (date: string) => void
  onTimeChange: (time: string) => void
  onQuantityChange: (qty: number) => void
}

const AVAILABLE_DATES = ["Oct 22", "Oct 23", "Oct 24", "Oct 25", "Oct 26"]
const AVAILABLE_TIMES = ["07:00 am", "09:00 am", "11:00 am", "1:00 pm"]

export function DetailsView({
  experience,
  selectedDate,
  selectedTime,
  quantity,
  onDateChange,
  onTimeChange,
  onQuantityChange,
}: DetailsViewProps) {
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
        <div className="flex gap-2 flex-wrap">
          {AVAILABLE_DATES.map((date) => (
            <button
              key={date}
              onClick={() => onDateChange(date)}
              className={`px-4 py-2 rounded font-medium transition ${
                selectedDate === date ? "bg-yellow-400 text-gray-900" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {date}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Choose time</h3>
        <div className="flex gap-2 flex-wrap">
          {AVAILABLE_TIMES.map((time) => (
            <button
              key={time}
              onClick={() => onTimeChange(time)}
              className={`px-4 py-2 rounded font-medium transition ${
                selectedTime === time ? "bg-yellow-400 text-gray-900" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">All times are in IST (GMT +5:30)</p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">About</h3>
        <p className="text-sm text-gray-600">Scenic routes, trained guides, and safety briefing. Minimum age 10.</p>
      </div>
    </div>
  )
}
