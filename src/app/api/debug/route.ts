import { NextResp    troubleshooting: {
      step1: 'Go to https://aistudio.google.com/app/apikey',
      step2: 'Create API key (starts with AIzaSy)',
      step3: 'Add to .env.local: GEMINI_API_KEY=your_key_here',
      step4: 'Restart server: npm run dev',
      step5: 'Test the API key is working',
      step6: 'Check console logs for detailed errors'
    },
    modelInfo: {
      currentModel: 'gemini-2.5-pro',
      note: 'Using the latest Gemini 2.5 Pro model'
    }from 'next/server';

export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY;

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    hasApiKey: !!apiKey,
    apiKeyLength: apiKey?.length || 0,
    isPlaceholder:
      apiKey === 'your_gemini_api_key_here' ||
      apiKey === 'YOUR_ACTUAL_API_KEY_HERE',
    apiKeyPreview: apiKey ? `${apiKey.substring(0, 10)}...` : 'Not set',
    envVarsLoaded: {
      NODE_ENV: process.env.NODE_ENV,
      envFileDetected: !!process.env.GEMINI_API_KEY,
    },
    troubleshooting: {
      step1: 'Go to https://aistudio.google.com/app/apikey',
      step2: 'Create API key (starts with AIzaSy)',
      step3: 'Add to .env.local: GEMINI_API_KEY=your_key_here',
      step4: 'Restart server: npm run dev',
      step5: 'Refresh this page to check',
    },
  });
}
