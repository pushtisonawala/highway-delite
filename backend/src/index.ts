import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001', 
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    /^http:\/\/192\.168\.\d+\.\d+:3000$/,
    /^http:\/\/192\.168\.\d+\.\d+:3001$/,
    /^http:\/\/10\.\d+\.\d+\.\d+:3000$/,
    /^http:\/\/10\.\d+\.\d+\.\d+:3001$/
  ],
  credentials: true
}));
app.use(express.json());

app.get('/api/experiences', async (req: Request, res: Response) => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(experiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ error: 'Failed to fetch experiences' });
  }
});

// GET /experiences/:id - Return details and slot availability
app.get('/api/experiences/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const experience = await prisma.experience.findUnique({
      where: { id },
      include: {
        slots: {
          where: {
            date: {
              gte: new Date()
            }
          },
          orderBy: { date: 'asc' }
        }
      }
    });

    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    res.json(experience);
  } catch (error) {
    console.error('Error fetching experience:', error);
    res.status(500).json({ error: 'Failed to fetch experience details' });
  }
});

// POST /bookings - Accept booking details and store them
app.post('/api/bookings', async (req: Request, res: Response) => {
  try {
    const {
      experienceId,
      slotId,
      name,
      email,
      phone,
      participants,
      totalPrice,
      promoCode
    } = req.body;

    // Validation
    if (!experienceId || !slotId || !name || !email || !phone || !participants) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if slot exists and has capacity
    const slot = await prisma.slot.findUnique({
      where: { id: slotId }
    });

    if (!slot) {
      return res.status(404).json({ error: 'Slot not found' });
    }

    if (slot.booked + participants > slot.capacity) {
      return res.status(400).json({ 
        error: 'Not enough capacity available',
        available: slot.capacity - slot.booked
      });
    }

    const booking = await prisma.$transaction(async (tx: any) => {
      // Create the booking
      const newBooking = await tx.booking.create({
        data: {
          experienceId,
          slotId,
          name,
          email,
          phone,
          participants,
          totalPrice,
          promoCode: promoCode || null,
          status: 'confirmed'
        },
        include: {
          experience: true,
          slot: true
        }
      });

      // Update slot booked count
      await tx.slot.update({
        where: { id: slotId },
        data: {
          booked: {
            increment: participants
          }
        }
      });

      return newBooking;
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// POST /promo/validate - Validate promo codes
app.post('/api/promo/validate', async (req: Request, res: Response) => {
  try {
    const { code, amount } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Promo code is required' });
    }

    const promoCode = await prisma.promoCode.findUnique({
      where: { code: code.toUpperCase() }
    });

    if (!promoCode || !promoCode.active) {
      return res.status(404).json({ 
        valid: false,
        error: 'Invalid or inactive promo code' 
      });
    }

    let discountAmount = 0;
    
    if (promoCode.type === 'percentage') {
      discountAmount = Math.floor((amount * promoCode.discount) / 100);
    } else if (promoCode.type === 'fixed') {
      discountAmount = promoCode.discount;
    }

    res.json({
      valid: true,
      code: promoCode.code,
      discount: promoCode.discount,
      type: promoCode.type,
      discountAmount,
      finalAmount: Math.max(0, amount - discountAmount)
    });
  } catch (error) {
    console.error('Error validating promo code:', error);
    res.status(500).json({ error: 'Failed to validate promo code' });
  }
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📱 Mobile access: http://[YOUR_LOCAL_IP]:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
