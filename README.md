# Meowhouse

A modern Next.js application built with TypeScript, Tailwind CSS, and ESLint.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint and fix issues automatically
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is formatted correctly

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Google Gemini AI** - Recipe generation and chat functionality

## AI Features Setup

To use the AI-powered recipe generation and chat features:

1. **Get API Key:**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Sign in with your Google account
   - Create a new API key (free)

2. **Configure Environment:**
   - Copy `.env.local.example` to `.env.local` (if exists) or create `.env.local`
   - Add your API key: `GEMINI_API_KEY=your_actual_api_key_here`

3. **Restart Server:**
   - Stop the dev server (Ctrl+C)
   - Run `npm run dev` again

4. **Test Features:**
   - Visit `/generate` for AI recipe creation
   - Visit `/chat` for cooking assistance

## Project Structure

```
src/
├── app/                 # App Router directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
└── components/         # Reusable components (to be added)
```
