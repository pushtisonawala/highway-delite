"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckoutForm } from "@/components/checkout-form"
import { PriceSummary } from "@/components/price-summary"
import { api } from "@/lib/api"
import type { Experience, PromoValidationResponse } from "@/lib/types"

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const experienceId = searchParams.get("experience")
  const slotId = searchParams.get("slotId")
  const quantity = Number.parseInt(searchParams.get("qty") || "1")

  const [experience, setExperience] = useState<Experience | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    promoCode: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [promoValidation, setPromoValidation] = useState<PromoValidationResponse | null>(null)
  const [promoApplied, setPromoApplied] = useState(false)

  useEffect(() => {
    const fetchExperience = async () => {
      if (!experienceId) return
      
      try {
        const data = await api.getExperienceById(experienceId)
        setExperience(data)
      } catch (error) {
        console.error("Failed to fetch experience:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchExperience()
  }, [experienceId])

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

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePromoValidation = async (code: string) => {
    if (!code.trim() || !experience) return

    try {
      const subtotal = experience.price * quantity
      const validation = await api.validatePromo(code.toUpperCase(), subtotal)
      setPromoValidation(validation)
      setPromoApplied(true)
      return validation
    } catch (error: any) {
      setPromoValidation({ valid: false, error: error.message || "Invalid promo code" })
      setPromoApplied(false)
      throw error
    }
  }

  const handlePayment = async () => {
    if (!validateForm() || !experienceId || !slotId || !experience) {
      return
    }

    setSubmitting(true)

    try {
      const subtotal = experience.price * quantity
      const finalAmount = promoApplied && promoValidation?.finalAmount 
        ? promoValidation.finalAmount 
        : subtotal

      const booking = await api.createBooking({
        experienceId,
        slotId,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        participants: quantity,
        totalPrice: finalAmount,
        promoCode: promoApplied ? formData.promoCode : undefined,
      })

      // Store booking ID in session storage for confirmation page
      sessionStorage.setItem('lastBooking', JSON.stringify(booking))
      
      router.push("/confirmation")
    } catch (error: any) {
      alert(error.message || "Failed to create booking. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  if (!experience || !slotId) {
    return <div className="text-center py-12">Experience not found</div>
  }

  const selectedSlot = experience.slots?.find(s => s.id === slotId)

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 text-sm sm:text-base"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          <div className="lg:col-span-2 order-1">
            <CheckoutForm 
              formData={formData} 
              errors={errors} 
              onFormChange={setFormData}
              onPromoValidate={handlePromoValidation}
              promoValidation={promoValidation}
              promoApplied={promoApplied}
            />
          </div>

          <div className="lg:col-span-1 order-2">
            <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 lg:sticky lg:top-8">
              <h3 className="font-semibold text-gray-900 mb-4 text-base sm:text-lg">Experience Summary</h3>
              <div className="space-y-2 sm:space-y-3 text-sm text-gray-600 mb-4 sm:mb-6">
                <div className="flex justify-between">
                  <span>Experience</span>
                  <span className="font-medium text-gray-900">{experience.title}</span>
                </div>
                {selectedSlot && (
                  <>
                    <div className="flex justify-between">
                      <span>Date</span>
                      <span className="font-medium text-gray-900">
                        {new Date(selectedSlot.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time</span>
                      <span className="font-medium text-gray-900">{selectedSlot.startTime}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between">
                  <span>Qty</span>
                  <span className="font-medium text-gray-900">{quantity}</span>
                </div>
              </div>

              <PriceSummary
                price={experience.price}
                quantity={quantity}
                onConfirm={handlePayment}
                buttonText={submitting ? "Processing..." : "Pay and Confirm"}
                disabled={submitting}
                promoDiscount={promoApplied && promoValidation?.discountAmount ? promoValidation.discountAmount : 0}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
