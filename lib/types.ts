export interface Experience {
  id: string
  title: string
  location: string
  description: string
  price: number
  image: string
  createdAt?: string
  updatedAt?: string
  slots?: Slot[]
}

export interface Slot {
  id: string
  experienceId: string
  date: string
  startTime: string
  endTime: string
  capacity: number
  booked: number
  createdAt?: string
  updatedAt?: string
}

export interface Booking {
  id: string
  experienceId: string
  slotId: string
  name: string
  email: string
  phone: string
  participants: number
  totalPrice: number
  promoCode?: string | null
  status: string
  createdAt?: string
  updatedAt?: string
  experience?: Experience
  slot?: Slot
}

export interface PromoCode {
  id: string
  code: string
  discount: number
  type: 'percentage' | 'fixed'
  active: boolean
  createdAt?: string
  updatedAt?: string
}

export interface PromoValidationResponse {
  valid: boolean
  code?: string
  discount?: number
  type?: 'percentage' | 'fixed'
  discountAmount?: number
  finalAmount?: number
  error?: string
}
