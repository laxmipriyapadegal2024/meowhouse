'use client';

import { useState, useEffect } from 'react';

interface DebugInfo {
  timestamp: string;
  hasApiKey: boolean;
  apiKeyLength: number;
  isPlaceholder: boolean;
  apiKeyPreview: string;
  envVarsLoaded: {
    NODE_ENV: string;
    envFileDetected: boolean;
  };
  troubleshooting: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step5: string;
  };
}

export default function DebugPage() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDebugInfo = async () => {
    try {
      const response = await fetch('/api/debug');
      const data = await response.json();
      setDebugInfo(data);
    } catch (error) {
      console.error('Failed to fetch debug info:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDebugInfo();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Debug Information</h1>
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Debug Information</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">API Key Status</h2>
          {debugInfo && (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Has API Key:</span>
                <span
                  className={`font-bold ${debugInfo.hasApiKey ? 'text-green-600' : 'text-red-600'}`}
                >
                  {debugInfo.hasApiKey ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Key Length:</span>
                <span>{debugInfo.apiKeyLength} characters</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Is Placeholder:</span>
                <span
                  className={`font-bold ${debugInfo.isPlaceholder ? 'text-red-600' : 'text-green-600'}`}
                >
                  {debugInfo.isPlaceholder ? 'Yes (NEEDS REPLACEMENT)' : 'No'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Preview:</span>
                <span className="font-mono">{debugInfo.apiKeyPreview}</span>
              </div>
            </div>
          )}
        </div>

        {debugInfo?.isPlaceholder && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-red-800 mb-3">
              ⚠️ Action Required
            </h3>
            <p className="text-red-700 mb-4">
              Your API key is still set to a placeholder value. Follow these
              steps to fix it:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-red-700">
              <li>{debugInfo.troubleshooting.step1}</li>
              <li>{debugInfo.troubleshooting.step2}</li>
              <li>{debugInfo.troubleshooting.step3}</li>
              <li>{debugInfo.troubleshooting.step4}</li>
              <li>{debugInfo.troubleshooting.step5}</li>
            </ol>
          </div>
        )}

        {debugInfo && !debugInfo.isPlaceholder && debugInfo.hasApiKey && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-green-800 mb-3">
              ✅ API Key Configured
            </h3>
            <p className="text-green-700">
              Your API key appears to be properly configured! The AI features
              should now work.
            </p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Environment Details</h2>
          {debugInfo && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Timestamp:</span>
                <span>{new Date(debugInfo.timestamp).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Environment:</span>
                <span>{debugInfo.envVarsLoaded.NODE_ENV}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Env File Detected:</span>
                <span
                  className={
                    debugInfo.envVarsLoaded.envFileDetected
                      ? 'text-green-600'
                      : 'text-red-600'
                  }
                >
                  {debugInfo.envVarsLoaded.envFileDetected ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={fetchDebugInfo}
            className="bg-burgundy-600 text-white px-6 py-2 rounded-lg hover:bg-burgundy-700 transition-colors"
          >
            Refresh Debug Info
          </button>
        </div>
      </div>
    </div>
  );
}
