"use client"

import { useState } from "react"
import type { PromoValidationResponse } from "@/lib/types"

interface CheckoutFormProps {
  formData: {
    fullName: string
    email: string
    phone: string
    promoCode: string
  }
  errors: Record<string, string>
  onFormChange: (data: any) => void
  onPromoValidate?: (code: string) => Promise<PromoValidationResponse>
  promoValidation?: PromoValidationResponse | null
  promoApplied?: boolean
}

export function CheckoutForm({ 
  formData, 
  errors, 
  onFormChange,
  onPromoValidate,
  promoValidation,
  promoApplied 
}: CheckoutFormProps) {
  const [validating, setValidating] = useState(false)

  const handleChange = (field: string, value: string) => {
    onFormChange({
      ...formData,
      [field]: value,
    })
  }

  const handlePromoApply = async () => {
    if (!formData.promoCode.trim() || !onPromoValidate) return

    setValidating(true)
    try {
      await onPromoValidate(formData.promoCode)
    } catch (error) {
      // Error is handled in parent component
    } finally {
      setValidating(false)
    }
  }

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Customer Details</h2>

      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="Your name"
              className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded bg-gray-100 text-gray-900 placeholder-gray-500 ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="your@email.com"
              className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded bg-gray-100 text-gray-900 placeholder-gray-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+91 9876543210"
            className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded bg-gray-100 text-gray-900 placeholder-gray-500 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Promo code</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={formData.promoCode}
              onChange={(e) => handleChange("promoCode", e.target.value.toUpperCase())}
              placeholder="Enter promo code"
              className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded bg-gray-100 text-gray-900 placeholder-gray-500"
              disabled={promoApplied}
            />
            <button 
              onClick={handlePromoApply}
              disabled={validating || promoApplied || !formData.promoCode.trim()}
              className="px-4 sm:px-6 py-2 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base whitespace-nowrap"
            >
              {validating ? "..." : promoApplied ? "Applied" : "Apply"}
            </button>
          </div>
          {promoValidation && (
            <div className="mt-2">
              {promoValidation.valid && promoApplied ? (
                <p className="text-green-600 text-sm">
                  ✓ Promo code applied! You save ₹{promoValidation.discountAmount}
                </p>
              ) : (
                promoValidation.error && (
                  <p className="text-red-500 text-sm">
                    ✗ {promoValidation.error}
                  </p>
                )
              )}
            </div>
          )}
        </div>

        <div className="flex items-start gap-3 mt-4 sm:mt-6">
          <input type="checkbox" id="terms" className="w-4 h-4 mt-1 border border-gray-300 rounded" />
          <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
            I agree to the terms and safety policy
          </label>
        </div>
      </div>
    </div>
  )
}
