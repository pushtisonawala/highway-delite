"use client"

interface PriceSummaryProps {
  price: number
  quantity: number
  onConfirm: () => void
  buttonText?: string
  disabled?: boolean
  promoDiscount?: number
}

export function PriceSummary({ 
  price, 
  quantity, 
  onConfirm, 
  buttonText = "Confirm",
  disabled = false,
  promoDiscount = 0
}: PriceSummaryProps) {
  const subtotal = price * quantity
  const discount = promoDiscount
  const afterDiscount = subtotal - discount
  const tax = Math.round(afterDiscount * 0.06)
  const total = afterDiscount + tax

  return (
    <div className="space-y-4">
      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Starts at</span>
          <span className="font-medium text-gray-900">₹{price}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Quantity</span>
          <span className="font-medium text-gray-900">{quantity}</span>
        </div>
        <div className="border-t border-gray-200 pt-2 sm:pt-3 flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">₹{subtotal}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-green-600">Promo Discount</span>
            <span className="font-medium text-green-600">-₹{discount}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Taxes</span>
          <span className="font-medium text-gray-900">₹{tax}</span>
        </div>
        <div className="border-t border-gray-200 pt-2 sm:pt-3 flex justify-between">
          <span className="font-semibold text-gray-900">Total</span>
          <span className="font-bold text-base sm:text-lg text-gray-900">₹{total}</span>
        </div>
      </div>

      <button
        onClick={onConfirm}
        disabled={disabled}
        className="w-full py-3 sm:py-3 text-sm sm:text-base bg-yellow-400 text-gray-900 font-semibold rounded hover:bg-yellow-500 transition disabled:bg-gray-300 disabled:cursor-not-allowed touch-manipulation"
      >
        {buttonText}
      </button>
    </div>
  )
}
