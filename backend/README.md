# Highway Experience Booking - Backend API

Backend API for Highway Experience Booking platform built with Node.js, Express, Prisma, and PostgreSQL (Neon).

## 🚀 Setup Complete!

Your database has been successfully setup and seeded with data!

## 📦 What's Included

### Database Tables:
- **Experiences** - 7 experiences (Kayaking, Nandi Hills, Coffee Trail, etc.)
- **Slots** - 98 time slots (next 7 days, morning & afternoon slots)
- **Bookings** - User bookings with validation
- **Promo Codes** - SAVE10, FLAT100, WELCOME20, ADVENTURE50

### API Endpoints:
- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get experience details with available slots
- `POST /api/bookings` - Create a new booking
- `POST /api/promo/validate` - Validate promo codes
- `GET /api/health` - Health check

## 🏃 Running the Server

### Development Mode:
```bash
cd backend
npm run dev
```

Server will run on: **http://localhost:5000**

### Production Mode:
```bash
cd backend
npm run build
npm start
```

## 📝 Environment Variables

Already configured in `.env`:
- `DATABASE_URL` - Neon PostgreSQL connection string
- `PORT` - Server port (default: 5000)

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run db:push` - Push Prisma schema to database
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npm run setup` - Push schema + seed data (one command)

## 📚 API Usage Examples

### Get All Experiences:
```bash
curl http://localhost:5000/api/experiences
```

### Get Experience by ID:
```bash
curl http://localhost:5000/api/experiences/{experienceId}
```

### Create Booking:
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "experienceId": "experience_id_here",
    "slotId": "slot_id_here",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "participants": 2,
    "totalPrice": 1998,
    "promoCode": "SAVE10"
  }'
```

### Validate Promo Code:
```bash
curl -X POST http://localhost:5000/api/promo/validate \
  -H "Content-Type: application/json" \
  -d '{
    "code": "SAVE10",
    "amount": 1000
  }'
```

## 🎟️ Promo Codes

- **SAVE10** - 10% discount
- **FLAT100** - ₹100 flat discount
- **WELCOME20** - 20% discount
- **ADVENTURE50** - ₹50 flat discount

## 🔒 Features

✅ Prevent double-booking (slot capacity management)  
✅ Input validation for all endpoints  
✅ Database transactions for bookings  
✅ CORS enabled for frontend integration  
✅ Automatic slot availability tracking  
✅ Promo code validation system  

## 📊 Database Management

### View Database (Prisma Studio):
```bash
cd backend
npm run db:studio
```

### Re-seed Database:
```bash
cd backend
npm run db:seed
```

## 🔗 Integration with Frontend

Update your frontend to use:
```typescript
const API_BASE_URL = 'http://localhost:5000/api';
```

Example fetch:
```typescript
const experiences = await fetch(`${API_BASE_URL}/experiences`).then(r => r.json());
```

## 📁 Project Structure

```
backend/
├── src/
│   └── index.ts          # Express server & API routes
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts          # Seed data script
├── .env                 # Environment variables
├── package.json         # Dependencies & scripts
└── tsconfig.json        # TypeScript config
```

## 🎯 Next Steps

1. **Start the backend server:**
   ```bash
   cd backend && npm run dev
   ```

2. **Update your frontend** to fetch from the API instead of mock data

3. **Test the API** using the examples above

---

**Server URL:** http://localhost:5000  
**Database:** Neon PostgreSQL (Already connected & seeded!)
