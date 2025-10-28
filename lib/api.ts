// API configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// API endpoints
export const API_ENDPOINTS = {
  experiences: `${API_BASE_URL}/experiences`,
  experienceById: (id: string) => `${API_BASE_URL}/experiences/${id}`,
  bookings: `${API_BASE_URL}/bookings`,
  validatePromo: `${API_BASE_URL}/promo/validate`,
  health: `${API_BASE_URL}/health`,
};

// API helper functions
export const api = {
  // Get all experiences
  getExperiences: async () => {
    const res = await fetch(API_ENDPOINTS.experiences);
    if (!res.ok) throw new Error('Failed to fetch experiences');
    return res.json();
  },

  // Get experience by ID with slots
  getExperienceById: async (id: string) => {
    const res = await fetch(API_ENDPOINTS.experienceById(id));
    if (!res.ok) throw new Error('Failed to fetch experience');
    return res.json();
  },

  // Create booking
  createBooking: async (bookingData: {
    experienceId: string;
    slotId: string;
    name: string;
    email: string;
    phone: string;
    participants: number;
    totalPrice: number;
    promoCode?: string;
  }) => {
    const res = await fetch(API_ENDPOINTS.bookings, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to create booking');
    }
    return res.json();
  },

  // Validate promo code
  validatePromo: async (code: string, amount: number) => {
    const res = await fetch(API_ENDPOINTS.validatePromo, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, amount }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to validate promo code');
    }
    return data;
  },
};
