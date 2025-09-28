'use client';

import Navigation from '@/components/Navigation';
import ApiSetupGuide from '@/components/ApiSetupGuide';
import { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface GeneratedRecipe {
  content: string;
  timestamp: string;
}

export default function GeneratePage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipes, setGeneratedRecipes] = useState<GeneratedRecipe[]>(
    []
  );
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]);
  const [chatMode, setChatMode] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    const userMessage = prompt;
    setPrompt('');

    try {
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userMessage,
          conversationHistory: conversationHistory,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const newRecipe = {
          content: data.response,
          timestamp: data.timestamp,
        };

        setGeneratedRecipes((prev) => [newRecipe, ...prev]);

        // Add to conversation history
        const newMessages: Message[] = [
          { role: 'user', content: userMessage, timestamp: data.timestamp },
          {
            role: 'assistant',
            content: data.response,
            timestamp: data.timestamp,
          },
        ];
        setConversationHistory((prev) => [...prev, ...newMessages]);
      } else {
        alert('Failed to generate recipe: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate recipe. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const quickPrompts = [
    { icon: '🍝', text: 'Italian pasta' },
    { icon: '🌮', text: 'Mexican tacos' },
    { icon: '🍛', text: 'Indian curry' },
    { icon: '🥗', text: 'Healthy salad' },
    { icon: '🍲', text: 'Comfort soup' },
    { icon: '🧁', text: 'Sweet dessert' },
    { icon: '🥘', text: 'One-pot meal' },
    { icon: '🍳', text: 'Quick breakfast' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <section className="bg-burgundy-gradient py-8">
        <div className="container mx-auto px-6">
          <h1 className="text-center text-white text-2xl font-bold">
            Generate recipe
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-200px)]">
        {/* Left Sidebar */}
        <div className="w-20 bg-burgundy-800 flex flex-col items-center py-8 space-y-6">
          <div className="w-12 h-12 bg-burgundy-700 rounded-lg flex items-center justify-center hover:bg-burgundy-600 cursor-pointer transition-colors">
            <span className="text-xl">🍳</span>
          </div>
          <div className="w-12 h-12 bg-burgundy-700 rounded-lg flex items-center justify-center hover:bg-burgundy-600 cursor-pointer transition-colors">
            <span className="text-xl">🥘</span>
          </div>
          <div className="w-12 h-12 bg-burgundy-700 rounded-lg flex items-center justify-center hover:bg-burgundy-600 cursor-pointer transition-colors">
            <span className="text-xl">🍜</span>
          </div>
          <div className="w-12 h-12 bg-burgundy-700 rounded-lg flex items-center justify-center hover:bg-burgundy-600 cursor-pointer transition-colors">
            <span className="text-xl">🥗</span>
          </div>
          <div className="w-12 h-12 bg-burgundy-700 rounded-lg flex items-center justify-center hover:bg-burgundy-600 cursor-pointer transition-colors">
            <span className="text-xl">🧁</span>
          </div>
          <div className="w-12 h-12 bg-burgundy-700 rounded-lg flex items-center justify-center hover:bg-burgundy-600 cursor-pointer transition-colors">
            <span className="text-xl">🍞</span>
          </div>
          <div className="w-12 h-12 bg-burgundy-700 rounded-lg flex items-center justify-center hover:bg-burgundy-600 cursor-pointer transition-colors">
            <span className="text-xl">🥩</span>
          </div>
        </div>

        {/* Main Generation Area */}
        <div className="flex-1 bg-wine-50 p-8">
          <div className="max-w-4xl mx-auto">
            <ApiSetupGuide />
            {/* Quick Prompts */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Quick ideas:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {quickPrompts.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(item.text)}
                    className="flex items-center space-x-2 bg-white p-3 rounded-lg hover:bg-gray-50 border border-gray-200 transition-colors"
                  >
                    <span>{item.icon}</span>
                    <span className="text-sm text-gray-700">{item.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mode Toggle */}
            <div className="flex justify-center mb-6">
              <div className="bg-white rounded-lg p-1 shadow-sm border">
                <button
                  onClick={() => setChatMode(false)}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    !chatMode
                      ? 'bg-burgundy-700 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Recipe Generation
                </button>
                <button
                  onClick={() => setChatMode(true)}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    chatMode
                      ? 'bg-burgundy-700 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Chat Mode
                </button>
              </div>
            </div>

            {!chatMode ? (
              <>
                {/* Prompt Input */}
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <label className="block text-gray-700 font-medium mb-3">
                    Enter prompt for your next Dishcovery...
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe what you'd like to cook. For example: 'A healthy vegetarian dinner for 4 people with ingredients I have: tomatoes, spinach, cheese, and pasta'"
                    className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-burgundy-500 focus:border-transparent"
                  />

                  <div className="flex justify-center mt-6">
                    <button
                      onClick={handleGenerate}
                      disabled={!prompt.trim() || isGenerating}
                      className="bg-burgundy-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-burgundy-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      {isGenerating ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>GENERATING...</span>
                        </div>
                      ) : (
                        'GENERATE'
                      )}
                    </button>
                  </div>
                </div>

                {/* Generated Recipes */}
                {generatedRecipes.length > 0 && (
                  <div className="mt-8 space-y-6">
                    <h3 className="text-xl font-bold text-gray-800">
                      Generated Recipes
                    </h3>
                    {generatedRecipes.map((recipe, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg p-6 shadow-sm border"
                      >
                        <div className="prose max-w-none">
                          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                            {recipe.content}
                          </div>
                        </div>
                        <div className="text-xs text-gray-400 mt-4">
                          Generated on{' '}
                          {new Date(recipe.timestamp).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              /* Chat Interface */
              <div className="bg-white rounded-lg shadow-sm border h-96 flex flex-col">
                <div className="border-b p-4">
                  <h3 className="font-semibold text-gray-800">
                    Chat with ChefBot 🍳
                  </h3>
                  <p className="text-sm text-gray-500">
                    Ask questions about your recipes or get cooking advice!
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {conversationHistory.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      <span className="text-4xl block mb-2">👨‍🍳</span>
                      <p>Hi! I'm ChefBot. Ask me anything about cooking!</p>
                    </div>
                  ) : (
                    conversationHistory.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.role === 'user'
                              ? 'bg-burgundy-700 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <div className="whitespace-pre-wrap text-sm">
                            {message.content}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  {isGenerating && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 px-4 py-2 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-burgundy-700"></div>
                          <span className="text-sm text-gray-600">
                            ChefBot is typing...
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === 'Enter' && !isGenerating && handleGenerate()
                      }
                      placeholder="Ask about cooking, ingredients, techniques..."
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                      disabled={isGenerating}
                    />
                    <button
                      onClick={handleGenerate}
                      disabled={!prompt.trim() || isGenerating}
                      className="bg-burgundy-700 text-white px-4 py-2 rounded-lg hover:bg-burgundy-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Chef Illustration */}
        <div className="w-80 bg-burgundy-gradient flex items-center justify-center">
          <div className="w-48 h-48 lg:w-64 lg:h-64 flex items-center justify-center">
            <div className="w-full h-full bg-white/10 rounded-full flex items-center justify-center">
              <span className="text-6xl lg:text-8xl">👨‍🍳</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
