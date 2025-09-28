'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 bg-white">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-burgundy-700 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">🍳</span>
          </div>
          <span className="font-script text-2xl text-burgundy-800 font-bold">
            dishcovery
          </span>
        </div>

        {/* Navigation Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            href="/" 
            className="text-gray-700 hover:text-burgundy-700 font-medium transition-colors"
          >
            home
          </Link>
          <Link 
            href="/search" 
            className="text-gray-700 hover:text-burgundy-700 font-medium transition-colors"
          >
            search
          </Link>
          <Link 
            href="/generate" 
            className="text-gray-700 hover:text-burgundy-700 font-medium transition-colors"
          >
            generate
          </Link>
          <Link 
            href="/write" 
            className="text-gray-700 hover:text-burgundy-700 font-medium transition-colors"
          >
            write
          </Link>
        </div>

        {/* Login Button */}
        <button
          onClick={() => setIsLoginOpen(true)}
          className="bg-burgundy-700 text-white px-6 py-2 rounded-full font-medium hover:bg-burgundy-800 transition-colors"
        >
          LOG IN
        </button>
      </nav>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
            <button
              onClick={() => setIsLoginOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-6">Choose an account</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="font-medium">Guest User</p>
                  <p className="text-sm text-gray-500">Continue as guest</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  G
                </div>
                <div>
                  <p className="font-medium">Google Account</p>
                  <p className="text-sm text-gray-500">Sign in with Google</p>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                By continuing, you agree to our{' '}
                <Link href="/terms" className="text-burgundy-700 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-burgundy-700 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}