## Highway Delite - Experience Booking Platform

A modern, full-stack web application for booking unique travel experiences. Built with Next.js, TypeScript, Prisma, and PostgreSQL.

## Features

- **Experience Discovery**: Browse and search through various travel experiences
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Search**: Dynamic filtering of experiences
- **Booking System**: Complete booking flow with form validation
- **Modern UI**: Built with Tailwind CSS and Radix UI components
- **Type Safety**: Full TypeScript implementation
- **Database Integration**: PostgreSQL with Prisma ORM

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **pnpm** - Package manager (npm comes with Node.js)
- **PostgreSQL** (version 12 or higher) - [Download here](https://postgresql.org/download/)
- **Git** - [Download here](https://git-scm.com/)

##  Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/pushtisonawala/highway-delite.git
cd highway-delite
```

### 2. Frontend Setup

```bash
# Install frontend dependencies
npm install
# or if you prefer pnpm
pnpm install
```

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install
```

### 4. Database Setup

#### Create PostgreSQL Database

1. Start your PostgreSQL service
2. Create a new database:

```sql
CREATE DATABASE highway_delite;
```

#### Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
# backend/.env
DATABASE_URL="postgresql://username:password@localhost:5432/highway_delite"
PORT=3001
NODE_ENV=development
```

Replace `username` and `password` with your PostgreSQL credentials.

#### Initialize Database

```bash
# From the backend directory
npm run db:push    # Create database tables
npm run db:seed    # Seed with sample data
```

## 🚀 Running the Application

### Development Mode

#### 1. Start the Backend Server

```bash
# From the backend directory
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

#### 2. Start the Frontend Development Server

```bash
# From the root directory
npm run dev
```

The frontend will start on `http://localhost:3000` (or `http://localhost:3001` if 3000 is occupied)

### Production Mode

#### 1. Build the Frontend

```bash
npm run build
```

#### 2. Build the Backend

```bash
cd backend
npm run build
```

#### 3. Start Production Servers

```bash
# Start backend
cd backend
npm start

# Start frontend (in another terminal)
npm start
```

##  Project Structure

```
highway-delite/
├── app/                         
│   ├── admin/                    # Admin pages
│   ├── checkout/                 # Checkout page
│   ├── confirmation/             # Booking confirmation
│   ├── details/                  # Experience details
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── loading.tsx               # Loading component
│   └── page.tsx                  # Home page
├── backend/                      # Backend API
│   ├── prisma/                   # Database schema & seeds
│   │   ├── schema.prisma         # Database schema
│   │   └── seed.ts               # Sample data
│   ├── src/                      # Source code
│   │   ├── routes/               # API routes
│   │   └── index.ts              # Server entry point
│   └── package.json              # Backend dependencies
├── components/                   # React components
│   ├── ui/                       # UI components (shadcn/ui)
│   ├── checkout-form.tsx         # Checkout form
│   ├── details-view.tsx          # Experience details view
│   ├── experience-card.tsx       # Experience card component
│   ├── header.tsx                # Navigation header
│   ├── price-summary.tsx         # Price calculation
│   └── search-provider.tsx       # Search context provider
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions
│   ├── api.ts                    # API client
│   ├── mock-data.ts              # Sample data
│   ├── types.ts                  # TypeScript types
│   └── utils.ts                  # Helper functions
├── public/                       # Static assets
├── styles/                       # Additional styles
├── components.json               # shadcn/ui config
├── next.config.mjs               # Next.js configuration
├── package.json                  # Frontend dependencies
├── postcss.config.mjs            # PostCSS configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

##  Available Scripts

### Frontend Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm start           # Start production server
npm run lint        # Run ESLint
```

### Backend Scripts

```bash
npm run dev         # Start development server with hot reload
npm run build       # Build TypeScript to JavaScript
npm start           # Start production server
npm run db:push     # Push schema changes to database
npm run db:seed     # Seed database with sample data
npm run db:studio   # Open Prisma Studio (database GUI)
npm run setup       # Setup database (push + seed)
```

##  Database Management

### Prisma Studio

Access the database GUI:

```bash
cd backend
npm run db:studio
```

This opens Prisma Studio at `http://localhost:5555`

### Database Reset

To reset the database:

```bash
cd backend
npm run db:push    # Reset schema
npm run db:seed    # Re-seed data
```

### Schema Changes

When you modify `backend/prisma/schema.prisma`:

```bash
cd backend
npm run db:push    # Apply changes to database
```

##  Environment Variables

### Backend (.env)

```env
DATABASE_URL="postgresql://username:password@localhost:5432/highway_delite"
PORT=3001
NODE_ENV=development
```

### Frontend (.env.local) - Optional

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

##  Styling

This project uses:

- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible UI components
- **shadcn/ui** - Re-usable component library
- **Lucide React** - Icon library

##  Responsive Design

The application is fully responsive and optimized for:

- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

##  Testing

```bash
# Run tests (when implemented)
npm test

# Run tests in watch mode
npm run test:watch
```

##  Deployment

### Vercel (Recommended for Frontend)

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. Add environment variables in Vercel dashboard

### Railway/Heroku (Backend)

1. Create a new project
2. Connect your repository
3. Add PostgreSQL addon
4. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 3000
   npx kill-port 3000
   ```

2. **Database connection issues**
   - Ensure PostgreSQL is running
   - Check DATABASE_URL in .env file
   - Verify database exists

3. **Build errors**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   ```

4. **Module not found errors**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

### Getting Help

- Check the [Issues](https://github.com/pushtisonawala/highway-delite/issues) page
- Create a new issue with detailed error information
- Include your Node.js version, OS, and steps to reproduce



**Happy coding! 🎉**