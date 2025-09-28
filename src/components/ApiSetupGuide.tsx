'use client';

import { useState, useEffect } from 'react';

export default function ApiSetupGuide() {
  const [apiStatus, setApiStatus] = useState<{
    hasValidApiKey: boolean;
    status: string;
    instructions: string;
  } | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    try {
      const response = await fetch('/api/test');
      const data = await response.json();
      setApiStatus(data);
    } catch (error) {
      console.error('Failed to check API status:', error);
    } finally {
      setIsChecking(false);
    }
  };

  if (isChecking) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="animate-pulse">Checking API setup...</div>
      </div>
    );
  }

  if (!apiStatus || apiStatus.hasValidApiKey) {
    return null; // Don't show if API is properly configured
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
      <div className="flex items-start space-x-3">
        <div className="text-yellow-500 text-2xl">⚠️</div>
        <div className="flex-1">
          <h3 className="font-semibold text-yellow-800 mb-2">
            API Key Required
          </h3>
          <p className="text-yellow-700 mb-4">
            To use the AI features, you need to add your Google Gemini API key.
          </p>

          <div className="bg-white rounded-lg p-4 border border-yellow-200">
            <h4 className="font-medium text-gray-800 mb-2">Quick Setup:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
              <li>
                Visit{' '}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Google AI Studio
                </a>{' '}
                and create a free API key
              </li>
              <li>
                Open the{' '}
                <code className="bg-gray-100 px-1 rounded">.env.local</code>{' '}
                file in your project
              </li>
              <li>
                Replace{' '}
                <code className="bg-gray-100 px-1 rounded">
                  your_gemini_api_key_here
                </code>{' '}
                with your actual API key
              </li>
              <li>Restart your development server</li>
            </ol>
          </div>

          <button
            onClick={checkApiStatus}
            className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm"
          >
            Check Again
          </button>
        </div>
      </div>
    </div>
  );
}
