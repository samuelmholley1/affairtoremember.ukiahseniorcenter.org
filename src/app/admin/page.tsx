'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Check if already authenticated on page load
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
      // Set cookie for middleware
      document.cookie = 'adminAuth=true; path=/; max-age=86400' // 24 hours
      setError('')
    } else {
      setError('Incorrect password')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    // Clear cookie
    document.cookie = 'adminAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    setPassword('')
  }

  // Brand colors
  const colors = {
    navy: '#042148',
    burgundy: '#9F3833',
    black: '#000000',
    white: '#FFFFFF',
    neutralStroke: '#E5E7EB',
    lightGray: '#F9FAFB',
    gray: '#6B7280'
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" style={{ fontFamily: 'Georgia, serif' }}>
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold" style={{ color: colors.navy }}>
              Admin Access
            </h2>
            <p className="mt-2 text-center text-sm" style={{ color: colors.gray }}>
              Enter password to access admin pages
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm text-center">
                {error}
              </div>
            )}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                style={{ backgroundColor: colors.navy }}
              >
                Access Admin
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Georgia, serif' }}>
      <div className="max-w-4xl mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: colors.navy }}>
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white rounded-md"
            style={{ backgroundColor: colors.burgundy }}
          >
            Logout
          </button>
        </div>

        {/* Public Pages Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4" style={{ color: colors.navy }}>
            Public Pages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link 
              href="/"
              className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
              style={{ borderColor: colors.neutralStroke }}
            >
              <h3 className="font-semibold" style={{ color: colors.burgundy }}>
                Home Page
              </h3>
              <p className="text-sm" style={{ color: colors.gray }}>
                Main landing page
              </p>
            </Link>
            
            <Link 
              href="/auction-donations"
              className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
              style={{ borderColor: colors.neutralStroke }}
            >
              <h3 className="font-semibold" style={{ color: colors.burgundy }}>
                Auction Donations
              </h3>
              <p className="text-sm" style={{ color: colors.gray }}>
                Donation form for auction items
              </p>
            </Link>
            
            <Link 
              href="/table-sponsors"
              className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
              style={{ borderColor: colors.neutralStroke }}
            >
              <h3 className="font-semibold" style={{ color: colors.burgundy }}>
                Table Sponsors
              </h3>
              <p className="text-sm" style={{ color: colors.gray }}>
                Sponsorship form and tickets
              </p>
            </Link>
          </div>
        </div>

        {/* Admin Protected Pages Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4" style={{ color: colors.navy }}>
            Admin Protected Pages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <Link 
              href="/qr-codes"
              className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
              style={{ borderColor: colors.neutralStroke }}
            >
              <h3 className="font-semibold" style={{ color: colors.burgundy }}>
                QR Codes
              </h3>
              <p className="text-sm" style={{ color: colors.gray }}>
                Letter with QR codes and sponsorship table
              </p>
            </Link>
            
            <Link 
              href="/sponsorship-form"
              className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
              style={{ borderColor: colors.neutralStroke }}
            >
              <h3 className="font-semibold" style={{ color: colors.burgundy }}>
                Sponsorship Form
              </h3>
              <p className="text-sm" style={{ color: colors.gray }}>
                Print-ready sponsorship form
              </p>
            </Link>
            
            <Link 
              href="/auction-letter"
              className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
              style={{ borderColor: colors.neutralStroke }}
            >
              <h3 className="font-semibold" style={{ color: colors.burgundy }}>
                Auction Letter
              </h3>
              <p className="text-sm" style={{ color: colors.gray }}>
                Letter for auction donations
              </p>
            </Link>
            
            <Link 
              href="/donation-list"
              className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
              style={{ borderColor: colors.neutralStroke }}
            >
              <h3 className="font-semibold" style={{ color: colors.burgundy }}>
                Donation List
              </h3>
              <p className="text-sm" style={{ color: colors.gray }}>
                View all auction donations (Live / Silent)
              </p>
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border-t pt-6" style={{ borderColor: colors.neutralStroke }}>
          <h2 className="text-xl font-semibold mb-4" style={{ color: colors.navy }}>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => window.open('/qr-codes', '_blank')}
              className="p-4 text-left border rounded-lg hover:shadow-md transition-shadow"
              style={{ borderColor: colors.neutralStroke }}
            >
              <h3 className="font-semibold" style={{ color: colors.burgundy }}>
                📄 Download QR Codes Letter
              </h3>
              <p className="text-sm" style={{ color: colors.gray }}>
                Open QR codes page in new tab
              </p>
            </button>
            
            <button
              onClick={() => window.open('/sponsorship-form', '_blank')}
              className="p-4 text-left border rounded-lg hover:shadow-md transition-shadow"
              style={{ borderColor: colors.neutralStroke }}
            >
              <h3 className="font-semibold" style={{ color: colors.burgundy }}>
                📋 Download Sponsorship Form
              </h3>
              <p className="text-sm" style={{ color: colors.gray }}>
                Open sponsorship form in new tab
              </p>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t" style={{ borderColor: colors.neutralStroke }}>
          <p className="text-xs" style={{ color: colors.gray }}>
            Ukiah Senior Center Admin Dashboard
          </p>
        </div>
      </div>
    </div>
  )
}