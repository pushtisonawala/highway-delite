"use client"

interface PriceSummaryProps {
  price: number
  quantity: number
  onConfirm: () => void
  buttonText?: string
}

export function PriceSummary({ price, quantity, onConfirm, buttonText = "Confirm" }: PriceSummaryProps) {
  const subtotal = price * quantity
  const tax = Math.round(subtotal * 0.06)
  const total = subtotal + tax

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-6 sticky top-8">
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Starts at</span>
          <span className="font-medium text-gray-900">₹{price}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Quantity</span>
          <span className="font-medium text-gray-900">{quantity}</span>
        </div>
        <div className="border-t border-gray-200 pt-3 flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Taxes</span>
          <span className="font-medium text-gray-900">₹{tax}</span>
        </div>
        <div className="border-t border-gray-200 pt-3 flex justify-between">
          <span className="font-semibold text-gray-900">Total</span>
          <span className="font-bold text-lg text-gray-900">₹{total}</span>
        </div>
      </div>

      <button
        onClick={onConfirm}
        className="w-full py-3 bg-yellow-400 text-gray-900 font-semibold rounded hover:bg-yellow-500 transition"
      >
        {buttonText}
      </button>
    </div>
  )
}
