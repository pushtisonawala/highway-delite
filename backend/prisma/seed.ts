import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  console.log('🧹 Cleaning existing data...');
  await prisma.booking.deleteMany();
  await prisma.slot.deleteMany();
  await prisma.promoCode.deleteMany();
  await prisma.experience.deleteMany();

  // Seed Experiences (using your exact data)
  console.log('📝 Creating experiences...');
  const experiences = await Promise.all([
    prisma.experience.create({
      data: {
        title: 'Kayaking',
        location: 'Udupi',
        description: 'Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert well accompany in kayaking.',
        price: 999,
        image: '/kayaking-in-river.jpg',
      }
    }),
    prisma.experience.create({
      data: {
        title: 'Nandi Hills Sunrise',
        location: 'Bangalore',
        description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
        price: 899,
        image: '/sunrise-over-hills.jpg',
      }
    }),
    prisma.experience.create({
      data: {
        title: 'Coffee Trail',
        location: 'Coorg',
        description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
        price: 1299,
        image: '/coffee-plantation-trail.jpg',
      }
    }),
    prisma.experience.create({
      data: {
        title: 'Kayaking',
        location: 'Udupi, Karnataka',
        description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
        price: 999,
        image: '/kayaking-adventure.png',
      }
    }),
    prisma.experience.create({
      data: {
        title: 'Boat Cruise',
        location: 'Sundarbans',
        description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
        price: 999,
        image: '/boat-cruise.jpg',
      }
    }),
    prisma.experience.create({
      data: {
        title: 'Bunjee Jumping',
        location: 'Marali',
        description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
        price: 999,
        image: '/bungee-jumping.jpg',
      }
    }),
    prisma.experience.create({
      data: {
        title: 'Coffee Trail',
        location: 'Coorg',
        description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
        price: 1299,
        image: '/coffee-estate.jpg',
      }
    }),
  ]);

  console.log(`✅ Created ${experiences.length} experiences`);

  // Create slots for each experience (next 7 days, 2 slots per day)
  console.log('📅 Creating time slots...');
  let totalSlots = 0;
  
  for (const experience of experiences) {
    for (let day = 0; day < 7; day++) {
      const date = new Date();
      date.setDate(date.getDate() + day);
      date.setHours(0, 0, 0, 0);

      // Morning slot
      await prisma.slot.create({
        data: {
          experienceId: experience.id,
          date,
          startTime: '09:00',
          endTime: '12:00',
          capacity: 10,
          booked: 0,
        }
      });

      // Afternoon slot
      await prisma.slot.create({
        data: {
          experienceId: experience.id,
          date,
          startTime: '14:00',
          endTime: '17:00',
          capacity: 10,
          booked: 0,
        }
      });

      totalSlots += 2;
    }
  }

  console.log(`✅ Created ${totalSlots} time slots`);

  // Seed Promo Codes
  console.log('🎟️  Creating promo codes...');
  await prisma.promoCode.createMany({
    data: [
      {
        code: 'SAVE10',
        discount: 10,
        type: 'percentage',
        active: true,
      },
      {
        code: 'FLAT100',
        discount: 100,
        type: 'fixed',
        active: true,
      },
      {
        code: 'WELCOME20',
        discount: 20,
        type: 'percentage',
        active: true,
      },
      {
        code: 'ADVENTURE50',
        discount: 50,
        type: 'fixed',
        active: true,
      },
    ]
  });

  console.log('✅ Created promo codes: SAVE10, FLAT100, WELCOME20, ADVENTURE50');

  console.log('');
  console.log('🎉 Database seeding completed successfully!');
  console.log('');
  console.log('Summary:');
  console.log(`  - ${experiences.length} experiences`);
  console.log(`  - ${totalSlots} time slots`);
  console.log(`  - 4 promo codes`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
