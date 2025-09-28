import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const hasApiKey = !!(
    process.env.GEMINI_API_KEY &&
    process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'
  );

  return NextResponse.json({
    status: 'API is working',
    hasValidApiKey: hasApiKey,
    apiKeyLength: process.env.GEMINI_API_KEY?.length || 0,
    timestamp: new Date().toISOString(),
    instructions: hasApiKey
      ? 'API key is configured!'
      : 'Please add your Gemini API key to .env.local',
  });
}
