"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckoutForm } from "@/components/checkout-form"
import { PriceSummary } from "@/components/price-summary"
import { MOCK_EXPERIENCES } from "@/lib/mock-data"

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const experienceId = searchParams.get("experience")
  const quantity = Number.parseInt(searchParams.get("qty") || "1")

  const experience = MOCK_EXPERIENCES.find((exp) => exp.id === experienceId)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    promoCode: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePayment = () => {
    if (validateForm()) {
      router.push("/confirmation")
    }
  }

  if (!experience) {
    return <div className="text-center py-12">Experience not found</div>
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900 mb-6 flex items-center gap-2"
        >
          ← Checkout
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutForm formData={formData} errors={errors} onFormChange={setFormData} />
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-300 p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">Experience</h3>
              <div className="space-y-3 text-sm text-gray-600 mb-6">
                <div className="flex justify-between">
                  <span>Experience</span>
                  <span className="font-medium text-gray-900">{experience.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date</span>
                  <span className="font-medium text-gray-900">{searchParams.get("date")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time</span>
                  <span className="font-medium text-gray-900">{searchParams.get("time")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Qty</span>
                  <span className="font-medium text-gray-900">{quantity}</span>
                </div>
              </div>

              <PriceSummary
                price={experience.price}
                quantity={quantity}
                onConfirm={handlePayment}
                buttonText="Pay and Confirm"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
