'use client';

import Navigation from '@/components/Navigation';
import ApiSetupGuide from '@/components/ApiSetupGuide';
import { useState, useEffect, useRef } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Add user message immediately
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newUserMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: messages,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.message,
          timestamp: data.timestamp,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        // Show specific error messages
        let errorContent = data.error || 'Failed to get response';
        if (data.needsApiKey) {
          errorContent = `🔑 ${data.error}\n\nTo fix this:\n1. Go to https://aistudio.google.com/app/apikey\n2. Create a free API key\n3. Add it to your .env.local file\n4. Restart the server`;
        }

        const errorMessage: Message = {
          role: 'assistant',
          content: errorContent,
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content:
          'Sorry, I encountered a network error. Please check your connection and try again!',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const suggestedQuestions = [
    'What can I make with chicken and rice?',
    'How do I make pasta sauce from scratch?',
    "What's a good vegetarian protein source?",
    'How do I properly season a steak?',
    'What are some healthy breakfast ideas?',
    'How do I store fresh herbs?',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <section className="bg-burgundy-gradient py-8">
        <div className="container mx-auto px-6">
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold mb-2">Chat with ChefBot</h1>
            <p className="text-wine-100">Your personal cooking assistant</p>
          </div>
        </div>
      </section>

      {/* Chat Container */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <ApiSetupGuide />
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Chat Header */}
            <div className="bg-burgundy-50 border-b p-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-burgundy-700 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">👨‍🍳</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">ChefBot</h3>
                  <p className="text-sm text-gray-500">
                    Always ready to help with cooking!
                  </p>
                </div>
              </div>
              <button
                onClick={clearChat}
                className="text-gray-500 hover:text-gray-700 px-3 py-1 rounded text-sm"
              >
                Clear Chat
              </button>
            </div>

            {/* Messages Area */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">👨‍🍳</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Welcome to ChefBot!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    I'm here to help you with recipes, cooking tips, and
                    culinary questions.
                  </p>

                  {/* Suggested Questions */}
                  <div className="text-left max-w-2xl mx-auto">
                    <h4 className="font-medium text-gray-700 mb-3">
                      Popular questions:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {suggestedQuestions.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => setInputMessage(question)}
                          className="text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-burgundy-700 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">
                        {message.content}
                      </div>
                      <div
                        className={`text-xs mt-2 ${
                          message.role === 'user'
                            ? 'text-wine-200'
                            : 'text-gray-500'
                        }`}
                      >
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-burgundy-700"></div>
                      <span className="text-gray-600">
                        ChefBot is typing...
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex space-x-3">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about cooking, recipes, ingredients..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-burgundy-500 focus:border-transparent"
                  rows={2}
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-burgundy-700 text-white px-6 py-3 rounded-lg hover:bg-burgundy-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors self-end"
                >
                  Send
                </button>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Press Enter to send, Shift+Enter for new line
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
