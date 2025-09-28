import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    // Better API key validation
    if (
      !process.env.GEMINI_API_KEY ||
      process.env.GEMINI_API_KEY === 'your_gemini_api_key_here' ||
      process.env.GEMINI_API_KEY === 'YOUR_ACTUAL_API_KEY_HERE' ||
      !process.env.GEMINI_API_KEY.startsWith('AIzaSy')
    ) {
      console.error('❌ Gemini API key not configured properly');
      return NextResponse.json(
        {
          error:
            'Please add your Gemini API key to .env.local file. Visit https://aistudio.google.com/app/apikey to get one.',
          needsApiKey: true,
        },
        { status: 500 }
      );
    }

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    console.log(
      '🤖 Processing chat message:',
      message.substring(0, 50) + '...'
    );
    console.log('🔑 API Key length:', process.env.GEMINI_API_KEY?.length);
    console.log(
      '🔑 API Key starts with AIzaSy:',
      process.env.GEMINI_API_KEY?.startsWith('AIzaSy')
    );

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

    // Create context-aware chat prompt
    const systemPrompt = `You are ChefBot, a friendly and knowledgeable culinary assistant from Dishcovery. You help users with:
    - Recipe suggestions and modifications
    - Cooking techniques and tips
    - Ingredient substitutions
    - Meal planning
    - Food safety questions
    - Kitchen equipment advice
    - Dietary accommodations

    Be conversational, helpful, and encouraging. Use emojis occasionally to make the conversation more engaging. Always try to provide practical, actionable advice.`;

    let fullPrompt = systemPrompt;

    // Include recent conversation history for context (last 10 messages)
    if (conversationHistory.length > 0) {
      const recentHistory = conversationHistory.slice(-10);
      fullPrompt +=
        '\n\nRecent conversation:\n' +
        recentHistory
          .map((msg: any) => `${msg.role}: ${msg.content}`)
          .join('\n');
    }

    fullPrompt += `\n\nUser: ${message}\nChefBot:`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      success: true,
      message: text,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Error in chat:', error);

    // More specific error messages
    if (error instanceof Error) {
      if (error.message.includes('API_KEY_INVALID')) {
        return NextResponse.json(
          {
            error:
              'Invalid API key. Please check your Gemini API key in .env.local',
          },
          { status: 401 }
        );
      }
      if (error.message.includes('QUOTA_EXCEEDED')) {
        return NextResponse.json(
          { error: 'API quota exceeded. Please check your Gemini API usage.' },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      {
        error: 'Failed to process message. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error : undefined,
      },
      { status: 500 }
    );
  }
}
