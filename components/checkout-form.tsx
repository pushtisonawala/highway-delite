"use client"

interface CheckoutFormProps {
  formData: {
    fullName: string
    email: string
    promoCode: string
  }
  errors: Record<string, string>
  onFormChange: (data: any) => void
}

export function CheckoutForm({ formData, errors, onFormChange }: CheckoutFormProps) {
  const handleChange = (field: string, value: string) => {
    onFormChange({
      ...formData,
      [field]: value,
    })
  }

  return (
    <div className="bg-white rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="Your name"
              className={`w-full px-4 py-2 border rounded bg-gray-100 text-gray-900 placeholder-gray-500 ${
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
              placeholder="Your name"
              className={`w-full px-4 py-2 border rounded bg-gray-100 text-gray-900 placeholder-gray-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Promo code</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.promoCode}
              onChange={(e) => handleChange("promoCode", e.target.value)}
              placeholder="Enter promo code"
              className="flex-1 px-4 py-2 border border-gray-300 rounded bg-gray-100 text-gray-900 placeholder-gray-500"
            />
            <button className="px-6 py-2 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 transition">
              Apply
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-6">
          <input type="checkbox" id="terms" className="w-4 h-4 border border-gray-300 rounded" />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I agree to the terms and safety policy
          </label>
        </div>
      </div>
    </div>
  )
}
