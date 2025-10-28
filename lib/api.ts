// API configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://highway-delite-v1ur.onrender.com/api';

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
    try {
      console.log('Fetching experiences from:', API_ENDPOINTS.experiences);
      const res = await fetch(API_ENDPOINTS.experiences);
      if (!res.ok) {
        console.error('API Error:', res.status, res.statusText);
        throw new Error(`Failed to fetch experiences: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      console.log('Experiences fetched successfully:', data.length, 'items');
      return data;
    } catch (error) {
      console.error('Error fetching experiences:', error);
      throw error;
    }
  },

  // Get experience by ID with slots
  getExperienceById: async (id: string) => {
    try {
      console.log('Fetching experience by ID:', id, 'from:', API_ENDPOINTS.experienceById(id));
      const res = await fetch(API_ENDPOINTS.experienceById(id));
      if (!res.ok) {
        console.error('API Error:', res.status, res.statusText);
        throw new Error(`Failed to fetch experience: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      console.log('Experience fetched successfully:', data);
      return data;
    } catch (error) {
      console.error('Error fetching experience by ID:', error);
      throw error;
    }
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
