import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { prompt, conversationHistory = [] } = await request.json();

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

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

    // Create a comprehensive prompt for recipe generation
    const systemPrompt = `You are a professional chef and culinary expert. Your task is to help users create amazing recipes and provide cooking advice. 

    Please respond in a structured format for recipes:
    - Recipe Name (creative and appetizing)
    - Description (brief, enticing description)
    - Prep Time
    - Cook Time
    - Servings
    - Ingredients (with exact measurements)
    - Instructions (step-by-step, numbered)
    - Tips (optional cooking tips or variations)

    For general cooking questions, provide helpful, friendly advice. Always be encouraging and make cooking sound enjoyable.

    User request: ${prompt}`;

    // Include conversation history for context
    let fullPrompt = systemPrompt;
    if (conversationHistory.length > 0) {
      fullPrompt +=
        '\n\nPrevious conversation:\n' +
        conversationHistory
          .map((msg: any) => `${msg.role}: ${msg.content}`)
          .join('\n') +
        '\n\nNew request: ' +
        prompt;
    }

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      success: true,
      response: text,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error generating recipe:', error);
    return NextResponse.json(
      { error: 'Failed to generate recipe. Please try again.' },
      { status: 500 }
    );
  }
}
