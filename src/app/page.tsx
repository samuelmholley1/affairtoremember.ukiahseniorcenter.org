'use client'

import Link from "next/link"

export default function Home() {
  // Brand colors
  const colors = {
    navy: '#042148',
    burgundy: '#9F3833',
    white: '#FFFFFF',
    lightGray: '#F9FAFB',
    gray: '#6B7280'
  }

  return (
    <div className="min-h-screen" style={{ 
      background: `linear-gradient(135deg, ${colors.lightGray} 0%, ${colors.white} 100%)`,
      fontFamily: 'Georgia, serif'
    }}>
      
      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-6xl mx-auto px-6 py-16">
          
          {/* Event Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: colors.navy }}>
              An Affair to Remember
            </h1>
            <div className="text-2xl md:text-3xl mb-8" style={{ color: colors.burgundy }}>
              Annual Ukiah Senior Center Fundraising Dinner & Dance
            </div>
            
            {/* Event Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto mb-12">
              <div className="grid md:grid-cols-2 gap-8 text-left">
                
                {/* Left Column */}
                <div>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">📅</span>
                    <div>
                      <div className="font-bold text-xl" style={{ color: colors.navy }}>April 11, 2026</div>
                      <div className="text-gray-600">Saturday Evening</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">📍</span>
                    <div>
                      <div className="font-bold text-xl" style={{ color: colors.navy }}>Carl Purdy Hall</div>
                      <div className="text-gray-600">Redwood Empire Fairgrounds</div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">🍽️</span>
                    <div>
                      <div className="font-bold text-xl" style={{ color: colors.navy }}>Dinner by Lions Club</div>
                      <div className="text-gray-600">Full course meal included</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">🎵</span>
                    <div>
                      <div className="font-bold text-xl" style={{ color: colors.navy }}>Live Music</div>
                      <div className="text-gray-600">Dance to &ldquo;Decades&rdquo;</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What's Included Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-center mb-8" style={{ color: colors.navy }}>
              Event Includes
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🍽️</div>
                <div className="font-semibold" style={{ color: colors.burgundy }}>Gourmet Dinner</div>
                <div className="text-sm text-gray-600">Prepared by Redwood Empire Lions Club</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🎵</div>
                <div className="font-semibold" style={{ color: colors.burgundy }}>Live Dance Music</div>
                <div className="text-sm text-gray-600">Featuring &ldquo;Decades&rdquo; band</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🍷</div>
                <div className="font-semibold" style={{ color: colors.burgundy }}>No-Host Bar</div>
                <div className="text-sm text-gray-600">Full service bar & appetizers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🎁</div>
                <div className="font-semibold" style={{ color: colors.burgundy }}>Live & Silent Auctions</div>
                <div className="text-sm text-gray-600">Amazing items to bid on</div>
              </div>
            </div>
          </div>

          {/* Ticket Purchase Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-center mb-8" style={{ color: colors.navy }}>
              Get Your Tickets
            </h2>
            
            {/* Online Ticket Purchase Coming Soon */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🎟️</span>
                <div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: colors.navy }}>
                    Online Ticket Purchase Coming Soon!
                  </h3>
                  <p className="text-gray-700 mb-3">
                    We&apos;re setting up secure online ticket purchasing. In the meantime, you can purchase tickets by:
                  </p>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Calling:</strong> (707) 462-4343</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Visiting:</strong> Ukiah Senior Center, 499 Leslie St, Ukiah, CA</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Sponsorship Tables:</strong> Contact John McCowen at (707) 391-1788</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="mb-8">
                <div className="text-2xl font-bold mb-4" style={{ color: colors.burgundy }}>
                  Individual Tickets: $100 each
                </div>
                <div className="text-lg text-gray-600 mb-6">
                  Includes dinner, dancing, and auction participation
                </div>
              </div>
              
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="text-xl font-bold mb-4" style={{ color: colors.navy }}>
                  Sponsor Table Options Available
                </h3>
                <div className="text-gray-700 mb-4">
                  Reserved seating, complimentary wine, and recognition at the event
                </div>
                <div className="text-lg font-semibold" style={{ color: colors.burgundy }}>
                  Contact John McCowen: (707) 391-1788
                </div>
              </div>
            </div>
          </div>

          {/* About the Cause */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-center mb-8" style={{ color: colors.navy }}>
              Supporting Our Community
            </h2>
            <div className="max-w-4xl mx-auto text-lg leading-relaxed text-gray-700">
              <p className="mb-6">
                For more than 50 years, the Ukiah Senior Center has enhanced the lives of local seniors and disabled adults. 
                Your ticket purchase directly supports essential community services including:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="flex items-start mb-3">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Door-through-door transportation services</span>
                  </div>
                  <div className="flex items-start mb-3">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Medical appointment transportation</span>
                  </div>
                  <div className="flex items-start mb-3">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Outreach services to vulnerable adults</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-start mb-3">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Dine-in and take-out meal services</span>
                  </div>
                  <div className="flex items-start mb-3">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Social, educational, and health programs</span>
                  </div>
                  <div className="flex items-start mb-3">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Monthly newsletter and activity calendar</span>
                  </div>
                </div>
              </div>
              <p className="text-center">
                Learn more at <a href="https://www.ukiahseniorcenter.org" className="text-blue-600 hover:underline font-semibold">ukiahseniorcenter.org</a>
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.navy }}>
              Questions? Contact Us
            </h2>
            <div className="space-y-4">
              <div>
                <div className="font-bold text-lg" style={{ color: colors.burgundy }}>John McCowen</div>
                <div className="text-gray-600">Event Chair</div>
                <div className="text-lg">(707) 391-1788</div>
              </div>
              <div className="border-t pt-4">
                <div className="font-bold" style={{ color: colors.navy }}>Ukiah Senior Center</div>
                <div className="text-gray-600">499 Leslie St, Ukiah, CA 95482</div>
                <div>(707) 462-4343</div>
              </div>
            </div>
          </div>

          {/* Admin Links (Hidden at bottom) */}
          <div className="mt-16 text-center">
            <details className="inline-block">
              <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-600">
                Admin Access
              </summary>
              <div className="mt-4 space-x-4">
                <Link href="/admin" className="text-sm text-blue-600 hover:underline">
                  Admin Dashboard
                </Link>
                <Link href="/auction-letter" className="text-sm text-blue-600 hover:underline">
                  Auction Letter
                </Link>
                <Link href="/qr-codes" className="text-sm text-blue-600 hover:underline">
                  QR Codes
                </Link>
              </div>
            </details>
          </div>

        </div>
      </div>
    </div>
  );
}