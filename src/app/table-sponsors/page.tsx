'use client'

import { useState, useEffect } from 'react'
import type { Metadata } from 'next'
import SponsorshipForm from '@/components/SponsorshipForm'

export default function TableSponsorsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Check authentication on page load
  useEffect(() => {
    const auth = document.cookie.includes('adminAuth=true')
    if (auth) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'USC123!') {
      setIsAuthenticated(true)
      document.cookie = 'adminAuth=true; path=/; max-age=86400'
      setError('')
    } else {
      setError('Incorrect password')
    }
  }

  // Brand colors
  const colors = {
    navy: '#042148',
    burgundy: '#9F3833',
    gray: '#6B7280',
    lightGray: '#F9FAFB'
  }

  // Coming soon notice with admin access
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ 
        background: `linear-gradient(135deg, ${colors.lightGray} 0%, #FFFFFF 100%)`,
        fontFamily: 'Georgia, serif' 
      }}>
        <div className="max-w-lg w-full mx-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            
            {/* Coming Soon Notice */}
            <div className="mb-8">
              <div className="text-6xl mb-4">🎟️</div>
              <h1 className="text-3xl font-bold mb-4" style={{ color: colors.navy }}>
                Tickets & Sponsorships
              </h1>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-lg font-semibold text-amber-800 mb-2">
                  📅 Coming Soon!
                </p>
                <p className="text-amber-700">
                  Ticket sales and sponsorship opportunities will be available to the public soon.
                </p>
              </div>
            </div>

            {/* Admin Access */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.navy }}>
                Admin Preview Access
              </h3>
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error && (
                  <div className="text-red-600 text-sm">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors"
                  style={{ backgroundColor: colors.navy }}
                >
                  Preview Form
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <SponsorshipForm />
}