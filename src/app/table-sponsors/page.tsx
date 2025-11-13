'use client'

import { useState } from 'react'
import Script from 'next/script'
import SponsorshipForm from '@/components/SponsorshipForm'

export default function TableSponsorsPage() {
  const [showFormModal, setShowFormModal] = useState(false)

  const handleCreditClick = () => {
    const url = 'https://www.zeffy.com/embed/ticketing/an-affair-to-remember-2026-a-night-at-the-speakeasy?modal=true'

    // Try to use Zeffy's potential global API if available
    interface WindowWithZeffy extends Window {
      Zeffy?: {
        open?: (url: string) => void
      }
    }
    const anyWin = window as WindowWithZeffy
    try {
      if (anyWin.Zeffy && typeof anyWin.Zeffy.open === 'function') {
        anyWin.Zeffy.open(url)
        return
      }
      // Some embed scripts attach to attributes; try to dispatch a click on a temporary anchor
      const a = document.createElement('a')
      a.href = url
      a.setAttribute('data-zeffy-form-link', url)
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      return
    } catch {
      // Fallback: open in a new window/tab
      window.open(url, '_blank', 'noopener,noreferrer,width=900,height=700')
    }
  }

  return (
    <>
      {/* Zeffy embed script (loads the modal behavior) */}
      <Script
        src="https://zeffy-scripts.s3.ca-central-1.amazonaws.com/embed-form-script.min.js"
        strategy="afterInteractive"
      />

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

          {/* Zeffy Zero Fee Notice */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Zeffy Logo/Image */}
              <div className="flex-shrink-0">
                <img 
                  src="https://zeffy.com/wp-content/themes/zeffy/assets/images/logos/logo-zeffy-primary.svg" 
                  alt="Zeffy - Zero fees for nonprofits"
                  className="h-16 w-auto"
                />
              </div>
              
              {/* Warning Text */}
              <div className="flex-1">
                <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 text-2xl">⚠️</div>
                    <div>
                      <h3 className="text-lg font-bold text-red-900 mb-2">
                        Important: 100% of Your Payment Goes to Ukiah Senior Center
                      </h3>
                      <p className="text-red-800 text-sm mb-2">
                        Zeffy charges <strong>ZERO fees</strong> to nonprofits. During checkout, you may see an optional tip to support Zeffy&apos;s platform.
                      </p>
                      <p className="text-red-900 font-bold text-sm">
                        This tip is completely OPTIONAL and goes to Zeffy, not to the Ukiah Senior Center. You can change it to $0.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
              {/* Credit Card Option (Zeffy) */}
              <button
                data-zeffy-form-link="https://www.zeffy.com/embed/ticketing/an-affair-to-remember-2026-a-night-at-the-speakeasy?modal=true"
                zeffy-form-link="https://www.zeffy.com/embed/ticketing/an-affair-to-remember-2026-a-night-at-the-speakeasy?modal=true"
                onClick={handleCreditClick}
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
                  <h4 className="font-semibold text-gray-900 mb-1">Donations</h4>
                  <p className="text-sm text-gray-600">Support the Senior Center</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

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

              {/* USC Logo and Zeffy Zero Warning in Modal */}
              <div className="px-6 pt-4 pb-2">
                {/* USC Logo */}
                <div className="flex justify-center mb-4">
                  <img 
                    src="/logo.png" 
                    alt="Ukiah Senior Center"
                    className="h-20 w-auto"
                  />
                </div>

                {/* Zeffy Zero Notice */}
                <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    {/* Zeffy Logo */}
                    <div className="flex-shrink-0">
                      <img 
                        src="https://zeffy.com/wp-content/themes/zeffy/assets/images/logos/logo-zeffy-primary.svg" 
                        alt="Zeffy - Zero fees for nonprofits"
                        className="h-12 w-auto"
                      />
                    </div>
                    
                    {/* Warning Text */}
                    <div className="flex-1">
                      <div className="bg-red-50 border-2 border-red-500 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <div className="flex-shrink-0 text-xl">⚠️</div>
                          <div>
                            <h3 className="text-base font-bold text-red-900 mb-1">
                              100% Goes to Ukiah Senior Center
                            </h3>
                            <p className="text-red-800 text-xs mb-1">
                              Zeffy charges <strong>ZERO fees</strong>. Any optional tip during checkout goes to Zeffy, not USC.
                            </p>
                            <p className="text-red-900 font-bold text-xs">
                              You can change the tip to $0.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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