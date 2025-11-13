'use client'

import { useState, useRef, useEffect } from 'react'

export default function Home() {
  const [showZeffyModal, setShowZeffyModal] = useState(false)
  const [isZeffyLoading, setIsZeffyLoading] = useState(true)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const zeffyUrl = "https://www.zeffy.com/embed/ticketing/an-affair-to-remember-2026-a-night-at-the-speakeasy?modal=true"

  const handleBuyTicketsClick = () => {
    setShowZeffyModal(true)
    setIsZeffyLoading(true)
  }

  const handleCloseZeffy = () => {
    setShowZeffyModal(false)
  }

  useEffect(() => {
    if (!showZeffyModal) return

    document.body.style.overflow = 'hidden'

    setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 100)

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseZeffy()
      }
    }
    document.addEventListener('keydown', handleEsc)

    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleEsc)
    }
  }, [showZeffyModal])

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              An Affair to Remember 2026
            </h1>
            <p className="text-2xl text-purple-600 mb-8">
              A Night at the Speakeasy
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-8">
            <div className="grid md:grid-cols-2 gap-6 mb-8 text-lg">
              <div className="flex items-center">
                <span className="text-3xl mr-3">📅</span>
                <div>
                  <div className="font-bold text-gray-900">Saturday, April 11, 2026</div>
                  <div className="text-gray-600">Evening Event</div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-3xl mr-3">📍</span>
                <div>
                  <div className="font-bold text-gray-900">Carl Purdy Hall</div>
                  <div className="text-gray-600">Redwood Empire Fairgrounds</div>
                </div>
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                What&apos;s Included
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                <div className="flex items-center">
                  <span className="mr-2">🍽️</span>
                  <span>Gourmet dinner by Lions Club</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">🎵</span>
                  <span>Live music by &ldquo;Decades&rdquo; band</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">🍷</span>
                  <span>No-host bar & appetizers</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">🎁</span>
                  <span>Live & silent auctions</span>
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                $100 per ticket
              </div>
              <p className="text-gray-600">
                Supports Ukiah Senior Center services
              </p>
            </div>

            <button
              onClick={handleBuyTicketsClick}
              className="w-full group relative bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl p-8 transition-all transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
              type="button"
            >
              <div className="flex flex-col items-center">
                <div className="text-6xl mb-4">🎫</div>
                <h3 className="text-3xl font-bold mb-3">Buy Tickets Now</h3>
                <p className="text-purple-100 text-center text-lg">
                  Secure online payment with credit card
                </p>
              </div>
              <div className="absolute inset-0 rounded-xl border-4 border-transparent group-hover:border-purple-300 transition-all"></div>
            </button>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Other Ways to Purchase
              </h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <span className="mr-2">📞</span>
                  <span>Call: (707) 462-4343</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">🏢</span>
                  <span>Visit: Ukiah Senior Center, 499 Leslie St</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">⭐</span>
                  <span>Table Sponsorships: Contact John McCowen at (707) 391-1788</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            <a href="https://www.ukiahseniorcenter.org" className="hover:text-gray-700">
              ukiahseniorcenter.org
            </a>
          </div>
        </div>
      </div>

      {showZeffyModal && (
        <div
          className="fixed inset-0 z-50 grid place-items-center p-4"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(2px)'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseZeffy()
            }
          }}
        >
          <div
            className="max-w-[900px] w-[92vw] rounded-lg shadow-xl ring-1 ring-black/5 relative bg-white flex flex-col"
            style={{ maxHeight: '90vh' }}
          >
            <button
              ref={closeButtonRef}
              onClick={handleCloseZeffy}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 z-10"
              aria-label="Close payment modal"
            >
              <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="px-6 pt-6 pb-4 border-b border-neutral-200 flex items-center justify-center gap-3">
              <img 
                src="/logo.png" 
                alt="Ukiah Senior Center" 
                style={{ width: '60px', height: 'auto', display: 'block' }}
              />
              <h3 className="text-lg md:text-xl font-['Jost',sans-serif] font-bold text-[#427d78]" style={{ lineHeight: '1.2' }}>
                An Affair to Remember 2026
              </h3>
            </div>

            <div className="px-6 py-3 border-b border-neutral-200">
              <div className="bg-red-50 border border-red-400 rounded" style={{ padding: '8px 12px' }}>
                <p className="text-xs text-red-900 font-['Bitter',serif] text-center" style={{ marginBottom: '6px', lineHeight: '1.4' }}>
                  <strong>⚠️ Set Zeffy Tip to $0</strong> so you don&apos;t pay any fees.
                </p>
                <div className="bg-white rounded border border-red-300 flex justify-center items-center" style={{ padding: '6px', overflow: 'hidden' }}>
                  <img
                    src="/zero_tip_small.png"
                    alt="Set Zeffy tip to zero"
                    className="rounded"
                    style={{ 
                      maxWidth: '100%', 
                      height: 'auto', 
                      display: 'block'
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="relative flex-1 bg-gray-50" style={{ minHeight: '600px' }}>
              {isZeffyLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-neutral-200 rounded-full animate-spin" style={{ borderTopColor: '#427d78' }}></div>
                    <p className="text-sm text-neutral-600 font-['Bitter',serif]">Loading payment form...</p>
                  </div>
                </div>
              )}
              <iframe
                src={zeffyUrl}
                className="w-full h-full border-0"
                style={{ minHeight: '600px' }}
                title="Zeffy payment form for An Affair to Remember 2026"
                onLoad={() => setIsZeffyLoading(false)}
                allow="payment"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
