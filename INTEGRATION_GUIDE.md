# 🚀 Frontend-Backend Integration Guide

## ✅ Backend is LIVE!

Your backend server is running at: **http://localhost:5000**

## 📊 Database Status

✅ **Connected** to Neon PostgreSQL  
✅ **7 Experiences** seeded  
✅ **98 Time Slots** created (next 7 days)  
✅ **4 Promo Codes** active (SAVE10, FLAT100, WELCOME20, ADVENTURE50)

---

## 🔧 How to Integrate with Your Frontend

### 1. Use the API Helper (Already Created!)

I've created `lib/api.ts` with helper functions. Use them like this:

```typescript
import { api } from '@/lib/api';

// In your components or pages:
const experiences = await api.getExperiences();
const experience = await api.getExperienceById(id);
const booking = await api.createBooking({...});
const promoValidation = await api.validatePromo('SAVE10', 1000);
```

### 2. Update Your Pages

#### **`app/page.tsx`** - Home Page
Replace `MOCK_EXPERIENCES` with API call:

```typescript
import { api } from '@/lib/api';

export default async function HomePage() {
  const experiences = await api.getExperiences();
  
  return (
    // Your existing JSX with {experiences.map(...)}
  );
}
```

#### **`app/details/[id]/page.tsx`** - Details Page
Fetch experience with slots:

```typescript
import { api } from '@/lib/api';

export default async function DetailsPage({ params }: { params: { id: string } }) {
  const experience = await api.getExperienceById(params.id);
  
  return (
    // Show experience.slots for available time slots
  );
}
```

#### **`app/checkout/page.tsx`** - Checkout Page
Handle booking creation:

```typescript
import { api } from '@/lib/api';

const handleBooking = async () => {
  try {
    const booking = await api.createBooking({
      experienceId: "...",
      slotId: "...",
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 9876543210",
      participants: 2,
      totalPrice: 1998,
      promoCode: "SAVE10" // optional
    });
    
    // Redirect to confirmation
    router.push('/confirmation');
  } catch (error) {
    console.error('Booking failed:', error);
  }
};
```

#### **Promo Code Validation**
```typescript
const handlePromoValidation = async (code: string) => {
  try {
    const result = await api.validatePromo(code, totalAmount);
    if (result.valid) {
      // Apply discount
      setDiscount(result.discountAmount);
      setFinalAmount(result.finalAmount);
    }
  } catch (error) {
    // Show error
  }
};
```

---

## 🎯 Available Promo Codes

| Code | Type | Discount |
|------|------|----------|
| `SAVE10` | Percentage | 10% off |
| `FLAT100` | Fixed | ₹100 off |
| `WELCOME20` | Percentage | 20% off |
| `ADVENTURE50` | Fixed | ₹50 off |

---

## 🔄 Full User Flow

1. **Home → Browse Experiences**
   - `GET /api/experiences`
   - Display all experiences

2. **Details → View Slots & Book**
   - `GET /api/experiences/:id`
   - Show available time slots
   - User selects date & time

3. **Checkout → Enter Details & Apply Promo**
   - `POST /api/promo/validate` (if promo code entered)
   - Fill booking form
   - `POST /api/bookings`

4. **Confirmation → Success**
   - Show booking confirmation
   - Display booking details

---

## 🛠️ Quick Commands

### Start Backend Server:
```bash
cd backend
npm run dev
```

### Start Frontend Server:
```bash
npm run dev
```

### View Database:
```bash
cd backend
npm run db:studio
```

---

## 📝 API Response Examples

### Get Experiences:
```json
[
  {
    "id": "clx...",
    "title": "Kayaking",
    "location": "Udupi",
    "description": "Curated small-group experience...",
    "price": 999,
    "image": "/kayaking-in-river.jpg",
    "createdAt": "2024-10-28T...",
    "updatedAt": "2024-10-28T..."
  }
]
```

### Get Experience with Slots:
```json
{
  "id": "clx...",
  "title": "Kayaking",
  "price": 999,
  "slots": [
    {
      "id": "slot123",
      "date": "2024-10-29T00:00:00.000Z",
      "startTime": "09:00",
      "endTime": "12:00",
      "capacity": 10,
      "booked": 0
    }
  ]
}
```

### Create Booking:
```json
{
  "id": "booking123",
  "name": "John Doe",
  "email": "john@example.com",
  "status": "confirmed",
  "experience": { ... },
  "slot": { ... }
}
```

### Validate Promo:
```json
{
  "valid": true,
  "code": "SAVE10",
  "discount": 10,
  "type": "percentage",
  "discountAmount": 100,
  "finalAmount": 900
}
```

---

## 🎨 Environment Variable (Optional)

Add to your `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🚨 Error Handling

The API will return errors in this format:
```json
{
  "error": "Error message here"
}
```

For bookings, it prevents double-booking:
```json
{
  "error": "Not enough capacity available",
  "available": 3
}
```

---

## ✨ Features Implemented

✅ Dynamic experience listing  
✅ Slot availability tracking  
✅ Double-booking prevention  
✅ Promo code validation  
✅ Input validation  
✅ Database transactions  
✅ CORS enabled  
✅ Error handling  

---

**Backend Server:** http://localhost:5000  
**Frontend Server:** http://localhost:3000  
**Database:** Neon PostgreSQL (Connected & Seeded!)  

🎉 **Everything is ready! Start integrating your frontend!**
