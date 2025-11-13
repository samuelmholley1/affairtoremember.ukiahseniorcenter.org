'use client'

import { useState, useRef, useEffect } from 'react'
import SponsorshipForm from '@/components/SponsorshipForm'

export default function TableSponsorsPage() {
  const [showFormModal, setShowFormModal] = useState(false)
  const [showZeffyModal, setShowZeffyModal] = useState(false)
  const [isZeffyLoading, setIsZeffyLoading] = useState(true)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const zeffyUrl = "https://www.zeffy.com/embed/ticketing/an-affair-to-remember-2026-a-night-at-the-speakeasy?modal=true"

  // Handle Zeffy modal open
  const handleCreditCardClick = () => {
    setShowZeffyModal(true)
    setIsZeffyLoading(true)
  }

  // Handle Zeffy modal close
  const handleCloseZeffy = () => {
    setShowZeffyModal(false)
  }

  // Focus close button and handle escape key
  useEffect(() => {
    if (!showZeffyModal) return

    // Prevent body scroll
    document.body.style.overflow = 'hidden'

    // Focus close button
    setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 100)

    // Handle Esc key
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
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              An Affair to Remember 2026
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              A Night at the Speakeasy
            </p>
            <p className="text-lg text-gray-500">
              Saturday, April 11, 2026
            </p>
          </div>

          {/* Payment Method Choice */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
              Choose Your Payment Method
            </h2>
            <p className="text-center text-gray-600 mb-10">
              Select how you&apos;d like to purchase tickets or sponsor a table
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Credit Card Option (Opens Zeffy Modal) */}
              <button
                onClick={handleCreditCardClick}
                className="group relative bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl p-8 transition-all transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
                type="button"
              >
                <div className="flex flex-col items-center">
                  <div className="text-6xl mb-4">💳</div>
                  <h3 className="text-2xl font-bold mb-3">Credit Card</h3>
                  <p className="text-blue-100 text-center mb-4">
                    Pay instantly online with your credit or debit card
                  </p>
                  <div className="bg-blue-700 bg-opacity-50 rounded-lg px-4 py-2 text-sm font-semibold">
                    ⚡ Instant Confirmation
                  </div>
                </div>
                <div className="absolute inset-0 rounded-xl border-4 border-transparent group-hover:border-blue-300 transition-all"></div>
              </button>

              {/* Cash or Check Option */}
              <button
                onClick={() => setShowFormModal(true)}
                className="group relative bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl p-8 transition-all transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300"
                type="button"
              >
                <div className="flex flex-col items-center">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-2xl font-bold mb-3">Cash or Check</h3>
                  <p className="text-green-100 text-center mb-4">
                    Submit your details now, then mail or drop off payment
                  </p>
                  <div className="bg-green-700 bg-opacity-50 rounded-lg px-4 py-2 text-sm font-semibold">
                    📬 Pay Later
                  </div>
                </div>
                <div className="absolute inset-0 rounded-xl border-4 border-transparent group-hover:border-green-300 transition-all"></div>
              </button>
            </div>

            {/* Info Section */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl mb-2">🎫</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Tickets</h4>
                  <p className="text-sm text-gray-600">Individual tickets available</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">⭐</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Sponsorships</h4>
                  <p className="text-sm text-gray-600">Table sponsor packages</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">💝</div>
                  <h4 className="font-semibent text-gray-900 mb-1">Donations</h4>
                  <p className="text-sm text-gray-600">Support the Senior Center</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Zeffy Modal with Iframe Embed Shell */}
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
            {/* Close Button */}
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

            {/* Modal Header - Fixed at top */}
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

            {/* Tip Notice - Fixed at top */}
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

            {/* Iframe Container - Scrollable */}
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

      {/* Modal for Cash/Check Form */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 py-8 flex items-center justify-center">
            <div className="relative bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={() => setShowFormModal(false)}
                className="sticky top-0 right-0 float-right m-4 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 z-10 shadow-lg"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* USC Logo */}
              <div className="flex justify-center px-6 pt-4 pb-2">
                <img 
                  src="/logo.png" 
                  alt="Ukiah Senior Center"
                  className="h-20 w-auto"
                />
              </div>

              {/* Form Content */}
              <div className="px-6 pb-6">
                <SponsorshipForm />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}