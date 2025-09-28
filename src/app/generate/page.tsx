'use client';

import Navigation from '@/components/Navigation';
import { useState } from 'react';

export default function GeneratePage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      // Add your recipe generation logic here
    }, 2000);
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
            {/* Quick Prompts */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick ideas:</h3>
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

            {/* Generated Recipe Area */}
            {isGenerating && (
              <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
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