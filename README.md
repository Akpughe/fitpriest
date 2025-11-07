# THE FITNESS PRIEST

A modern fitness coaching web application built with Next.js, featuring personalized training plans, session scheduling, workout tracking, and analytics.

## 🎯 Phase 1 - UI/UX Design (COMPLETED) ✅

### Overview
Phase 1 focuses on building the complete visual structure of the application with all core pages designed and functional using placeholder data.

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Design System
- **Color Palette**: Warm orange/amber primary colors for energetic fitness vibe
- **Typography**: Bold, impactful system fonts
- **Layout**: Clean, minimal, modern aesthetic
- **Responsiveness**: Mobile-first design with tablet and desktop breakpoints

## 📱 Pages & Features

### Landing Page (`/`)
- Hero section with statistics and CTAs
- Key features showcase
- Trainer introduction with certifications
- Pricing plans preview
- Client testimonials
- Final call-to-action section

### Authentication
- **Sign In** (`/auth/signin`) - Email & Google OAuth
- **Sign Up** (`/auth/signup`) - Email & Google OAuth

### Client Dashboard (`/dashboard`)
- Overview statistics (weight, workouts, volume, streak)
- Next session preview with exercise details
- Recent workouts history
- Weight trend visualization

### Trainer Dashboard (`/trainer/dashboard`)
- Business metrics (clients, sessions, revenue)
- Today's schedule with client sessions
- Recent client list with progress
- Analytics overview (retention, completion, satisfaction)

### Plans (`/plans`)
- Three-tier pricing structure (Starter, Pro, Elite)
- Feature comparison
- FAQ section
- Free consultation CTA

### Consultation Booking (`/consultation`)
- Interactive date/time selection
- Session details and format
- Contact information form
- Booking confirmation flow

### Schedule (`/schedule`)
- Weekly calendar view
- Session list with details
- Navigation controls
- Empty state handling

### Workout Log (`/workout`)
- Exercise library with search
- Interactive set/rep/weight tracking
- Dynamic exercise management
- Total volume calculation

### Analytics (`/analytics`)
- Body weight trend over time
- Training volume progression
- Personal records showcase
- Milestone achievements

### Profile (`/profile`)
- Personal information management
- Fitness profile and goals
- Notification preferences
- Security settings
- Subscription management

## 🏗️ Project Structure

```
fitpriest/
├── app/                    # Next.js app directory
│   ├── analytics/         # Analytics page
│   ├── api/              # API routes (NEW in Phase 2)
│   │   └── auth/         # NextAuth endpoints
│   ├── auth/             # Authentication pages
│   ├── consultation/     # Consultation booking
│   ├── dashboard/        # Client dashboard
│   ├── plans/           # Pricing plans
│   ├── profile/         # User profile
│   ├── schedule/        # Session schedule
│   ├── trainer/         # Trainer dashboard
│   ├── workout/         # Workout logging
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Landing page
├── components/
│   ├── nav/             # Navigation components
│   │   ├── navbar.tsx   # Main navigation
│   │   └── footer.tsx   # Footer
│   └── ui/              # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── badge.tsx
│       └── textarea.tsx
├── lib/
│   ├── airtable/        # Airtable integration (NEW)
│   │   ├── client.ts    # Airtable client setup
│   │   ├── schema.ts    # Database schema definitions
│   │   ├── setup.ts     # Auto-creation utilities
│   │   └── queries/     # Type-safe query functions
│   └── utils.ts         # Utility functions
├── scripts/             # Automation scripts (NEW)
│   └── setup-airtable.ts # Auto-create Airtable tables
├── .env.example         # Environment variable template
├── tailwind.config.ts   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies
```

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Development Server

Open [http://localhost:3000](http://localhost:3000) to view the application.

## ✨ Key Features Implemented

### Design & UX
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth page transitions with Framer Motion
- ✅ Interactive hover states and animations
- ✅ Clean, modern fitness-oriented aesthetic
- ✅ Consistent spacing and typography
- ✅ Empty states with helpful CTAs

### Navigation
- ✅ Sticky navigation with active route indicators
- ✅ Mobile-responsive hamburger menu
- ✅ Smooth transitions between routes
- ✅ Footer with quick links

### Components
- ✅ Reusable UI component library
- ✅ Custom color palette with warm accents
- ✅ Typography system with bold headings
- ✅ Card-based layouts
- ✅ Form inputs with validation ready

### Pages
- ✅ 12 fully designed pages
- ✅ Placeholder data throughout
- ✅ Ready for backend integration
- ✅ SEO-friendly metadata

## 🎯 Phase 2 - Core Features & Data Connections (IN PROGRESS) 🚧

### Overview
Phase 2 focuses on connecting all dynamic features to Airtable and external APIs, transforming the UI into a fully functional fitness coaching platform.

### Tech Stack
**Backend & Data:**
- **Database**: Airtable (with auto-creation scripts)
- **Authentication**: NextAuth.js (Google OAuth + Email)
- **Payments**: Stripe Checkout + Webhooks
- **Email**: Resend + React Email
- **Calendar**: Google Calendar API
- **Validation**: Zod

### Database Schema

The application uses **8 Airtable tables**:

1. **Users** - All user accounts (clients + trainers)
2. **Subscriptions** - Active plans and payment tracking
3. **Consultations** - Free consultation bookings
4. **TrainerAvailability** - Trainer schedule configuration
5. **Sessions** - Booked training sessions
6. **WorkoutPlans** - Trainer-defined programs
7. **WorkoutLogs** - Client workout tracking
8. **BodyMetrics** - Body measurements and progress

### Setup Instructions

#### 1. Create Airtable Account & Base

1. Sign up at [airtable.com](https://airtable.com)
2. Create a new base (you can start with a blank base)
3. Note down your **Base ID** (found in the URL or API docs)

#### 2. Get Airtable Personal Access Token

1. Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
2. Click "Create new token"
3. Give it a name (e.g., "Fitness Priest Dev")
4. Add the following scopes:
   - `data.records:read`
   - `data.records:write`
   - `schema.bases:read`
   - `schema.bases:write`
5. Add access to your base
6. Copy the token (you won't see it again!)

#### 3. Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add your credentials
# At minimum, you need:
AIRTABLE_API_KEY=your_token_here
AIRTABLE_BASE_ID=your_base_id_here
```

#### 4. Auto-Create Airtable Tables

Run the setup script to automatically create all 8 tables with the correct schema:

```bash
# Create all tables with detailed logging
npm run setup:airtable

# View existing base info
npm run setup:airtable:info

# Validate that all required tables exist
npm run setup:airtable:validate
```

The script will:
- ✅ Check which tables already exist
- ✅ Create only missing tables
- ✅ Configure all fields with proper types
- ✅ Set up select options, date formats, etc.
- ✅ Provide detailed success/error reporting

#### 5. Verify Setup

After running the setup script, log into Airtable and verify that all 8 tables were created successfully.

### Features (Phase 2)

#### Authentication ✅ (Next)
- [ ] NextAuth.js configuration
- [ ] Google OAuth integration
- [ ] Email/password authentication
- [ ] User record creation in Airtable
- [ ] Protected routes middleware

#### Consultation Booking (Planned)
- [ ] Booking form with date/time selection
- [ ] Google Calendar event creation
- [ ] Automatic Google Meet link generation
- [ ] Email confirmation via Resend
- [ ] Record storage in Airtable

#### Payment Processing (Planned)
- [ ] Stripe Checkout integration
- [ ] Three-tier subscription plans
- [ ] Webhook handlers for payment events
- [ ] Subscription record updates in Airtable
- [ ] Payment success/failure handling

#### Session Scheduling (Planned)
- [ ] Trainer availability management
- [ ] Client session booking flow
- [ ] Calendar integration
- [ ] Session limits based on plan
- [ ] Email reminders

#### Workout & Metrics Tracking (Planned)
- [ ] Trainer workout plan creation
- [ ] Client workout logging
- [ ] Body metrics tracking
- [ ] Progress charts with Recharts
- [ ] Personal records tracking

#### Analytics Dashboard (Planned)
- [ ] Weight trend visualization
- [ ] Training volume charts
- [ ] Progress metrics
- [ ] Milestone achievements

## 🎨 Design Decisions

### Color Palette
- Primary: Warm orange (#F97316) - Energetic and motivating
- Accent: Amber (#F59E0B) - Complementary warmth
- Background: Clean white with subtle grays
- Text: High contrast for readability

### Typography
- Bold headings for impact
- System fonts for performance
- Consistent sizing scale
- Clear hierarchy

### Layout
- Container-based responsive design
- Grid and flexbox layouts
- Consistent spacing (Tailwind scale)
- Mobile-first approach

## 📦 Dependencies

### Core
- next: ^15.0.0
- react: ^18.3.1
- typescript: ^5

### Styling
- tailwindcss: ^3.4.1
- tailwindcss-animate: ^1.0.7

### UI & Animation
- framer-motion: ^11.11.17
- lucide-react: ^0.462.0
- class-variance-authority: ^0.7.0

### Backend & Data (Phase 2)
- airtable: ^0.12.2 - Database client
- zod: ^4.1.12 - Schema validation
- dotenv: ^17.2.3 - Environment variables

### Utilities
- clsx: ^2.1.1
- tailwind-merge: ^2.5.4
- date-fns: ^4.1.0
- recharts: ^2.13.3

### Dev Tools
- tsx: ^4.20.6 - TypeScript execution

## 📄 License

Copyright © 2025 THE FITNESS PRIEST. All rights reserved.

---

**Phase 1 Status**: ✅ Complete
**Branch**: `claude/phase-1-ui-design-011CUuKhR2jGsyrVZ2MBz8Kk`
**Build Status**: Passing
**Last Updated**: December 2025
