import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || !apiKey.startsWith('AIzaSy')) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'API key not properly configured',
          details: {
            hasKey: !!apiKey,
            keyLength: apiKey?.length || 0,
            startsCorrectly: apiKey?.startsWith('AIzaSy') || false,
          },
        },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

    // Simple test prompt
    const result = await model.generateContent(
      'Say "Hello, API is working!" in one sentence.'
    );
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      status: 'success',
      message: 'API key is working correctly!',
      testResponse: text,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('API Key Test Error:', error);

    return NextResponse.json(
      {
        status: 'error',
        message: 'API key test failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
