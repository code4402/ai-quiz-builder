This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# AI Quiz Builder

An intelligent quiz generation platform that leverages AI to create customized quizzes on any topic. Built with modern web technologies for a seamless user experience.

## Features

- _AI-Powered Quiz Generation_: Automatically generate quizzes on any topic using advanced AI
- _User Authentication_: Secure sign-up and login functionality
- _Role-Based Authorization_: Different access levels for users and administrators
- _Quiz Management_: Create, edit, delete, and organize quizzes
- _Real-time Results_: Instant feedback and scoring
- _Quiz History_: Track your quiz attempts and progress over time
- _Responsive Design_: Optimized for desktop, tablet, and mobile devices
- _Share Quizzes_: Generate shareable links for quizzes
  Adaptive Difficulty: Questions adjust automatically based on the user’s performance

Timed & Custom Mode: Take quizzes with timers or create personalized quiz settings

Question Bank: Maintain a reusable, categorized repository of questions

Analytics Dashboard: Visualize performance trends, accuracy, and weak topics

Admin Panel: Dedicated dashboard for managing users, quizzes, and reports

Export & Import Quizzes: Download quizzes as PDF/CSV or upload your own

Multimedia Support: Add images, audio, and video to questions

Leaderboard: Compete with others and view global rankings

Dark Mode: Toggle between light and dark themes for better user experience

Notifications: Get alerts for new quizzes, results, or updates

Gamification Elements: Earn badges, points, and achievements

Offline Mode: Attempt quizzes even without internet (PWA support)

## Tech Stack

### Frontend

- _Next.js 14_: React framework with App Router for server-side rendering and optimal performance
- _React_: Component-based UI library
- _TypeScript_: Type-safe development
- _Tailwind CSS_: Utility-first CSS framework for styling
- _Shadcn/ui_: Accessible component library

### Backend & Database

- _Supabase_: Backend-as-a-Service platform providing:
  - PostgreSQL database
  - Real-time subscriptions
  - RESTful API
  - Row Level Security (RLS)

### Authentication & Authorization

- _Supabase Auth_: Built-in authentication with support for:
  - Email/Password authentication
  - OAuth providers (Google, GitHub, etc.)
  - Magic link authentication
  - JWT-based session management
- _Row Level Security_: Database-level authorization policies

### AI Integration

- _OpenAI API_: GPT models for intelligent quiz generation
- _Anthropic Claude_ (optional): Alternative AI model for quiz content

### Deployment

- _Vercel_: Hosting and deployment platform optimized for Next.js

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.x or higher
- npm or yarn package manager
- Git

## Getting Started

### 1. Clone the Repository

bash
git clone https://github.com/yourusername/ai-quiz-builder.git
cd ai-quiz-builder

### 2. Install Dependencies

bash
npm install

# or

yarn install

### 3. Environment Setup

Create a .env.local file in the root directory and add the following variables:

env

# Supabase Configuration

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# AI API Keys

OPENAI_API_KEY=your_openai_api_key

# App Configuration

NEXT_PUBLIC_APP_URL=http://localhost:3000

### 4. Database Setup

Run the following SQL in your Supabase SQL editor to set up the database schema:

sql
-- Create users table extension
CREATE TABLE profiles (
id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
email TEXT UNIQUE NOT NULL,
full_name TEXT,
role TEXT DEFAULT 'user',
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quizzes table
CREATE TABLE quizzes (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
title TEXT NOT NULL,
description TEXT,
topic TEXT NOT NULL,
difficulty TEXT DEFAULT 'medium',
questions JSONB NOT NULL,
is_public BOOLEAN DEFAULT false,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz attempts table
CREATE TABLE quiz_attempts (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
score INTEGER NOT NULL,
total_questions INTEGER NOT NULL,
answers JSONB NOT NULL,
completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can view public quizzes" ON quizzes
FOR SELECT USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can create own quizzes" ON quizzes
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own quizzes" ON quizzes
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own quizzes" ON quizzes
FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own attempts" ON quiz_attempts
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own attempts" ON quiz_attempts
FOR INSERT WITH CHECK (auth.uid() = user_id);

### 5. Run the Development Server

bash
npm run dev

# or

yarn dev

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

ai-quiz-builder/
├── app/ # Next.js app directory
│ ├── (auth)/ # Authentication pages
│ ├── (dashboard)/ # Protected dashboard pages
│ ├── api/ # API routes
│ └── layout.tsx # Root layout
├── components/ # React components
│ ├── ui/ # Reusable UI components
│ ├── quiz/ # Quiz-specific components
│ └── auth/ # Authentication components
├── lib/ # Utility functions
│ ├── supabase/ # Supabase client configuration
│ ├── ai/ # AI integration utilities
│ └── utils.ts # Helper functions
├── types/ # TypeScript type definitions
├── public/ # Static assets
└── styles/ # Global styles

## Key Features Implementation

### Authentication Flow

- Users sign up with email/password or OAuth providers
- Email verification for new accounts
- Secure session management with JWT tokens
- Password reset functionality

### Quiz Generation

- Users input a topic and difficulty level
- AI generates relevant questions with multiple-choice answers
- Questions are validated and stored in the database
- Support for various question types and difficulty levels

### Authorization Levels

- _User_: Can create, attempt, and view own quizzes
- _Admin_: Can manage all quizzes and view analytics

## Scripts

bash

# Development

npm run dev # Start development server

# Build

npm run build # Create production build
npm run start # Start production server

# Code Quality

npm run lint # Run ESLint
npm run type-check # Run TypeScript compiler check

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

The application will be automatically deployed on every push to the main branch.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@aiquizbuilder.com or open an issue in the GitHub repository.

## Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- OpenAI for AI capabilities
- The open-source community

---

_Built with ❤ using Next.js and Supabase_
