'use client'

import { useState, useEffect } from 'react'
import QRCodeDisplay from '../../components/QRCodeDisplay'

export default function AuctionLetterPage() {
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
  // Get the base URL for the QR codes (will be the production URL)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://affairtoremember.ukiahseniorcenter.org'
  
  const auctionUrl = `${baseUrl}/auction-donations`

  const handleDownloadPDF = async () => {
    try {
      console.log('Starting server-side PDF generation...');
      
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: window.location.href,
          filename: 'auction-letter.pdf'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      // Download the PDF
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'auction-letter.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      console.log('PDF downloaded successfully!');
      
    } catch (error) {
      console.error('PDF generation error:', error);
      alert(`PDF Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  // Brand colors
  const colors = {
    navy: '#042148',
    burgundy: '#9F3833',
    gray: '#6B7280'
  }

  // Authentication guard
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" style={{ fontFamily: 'Georgia, serif' }}>
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold" style={{ color: colors.navy }}>
              Protected Page
            </h2>
            <p className="mt-2 text-center text-sm" style={{ color: colors.gray }}>
              Enter password to access auction letter
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <input
                type="password"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white"
                style={{ backgroundColor: colors.navy }}
              >
                Access Page
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen font-serif" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Print-optimized letter layout */}
      <div className="max-w-[8.5in] mx-auto px-8 py-6 print:px-6 print:py-4">

        {/* Letter Content - Updated */}
        <div className="mb-6 print:mb-5 text-gray-800 leading-relaxed print:text-sm print:leading-normal">
          <p className="mb-5">Greetings!</p>
          
          <p className="mb-5">
            &ldquo;An Affair to Remember&rdquo; - the annual Ukiah Senior Center fundraising dinner/dance will be held April 11, 2026, in Carl Purdy Hall at the Redwood Empire Fairgrounds. This event will feature dinner prepared by the Redwood Empire Lions Club, the dance music of <strong><em>&ldquo;Decades&rdquo;</em></strong>, a full-service no-host bar, appetizers, and live and silent auctions.
          </p>
          
          <p className="mb-5">
            Your donations to the Live and Silent Auctions will help ensure the success of this important fundraising event. Donations are tax-deductible as the Ukiah Senior Center is a 501(C)3 charitable organization. Please complete the attached Donation Form to establish donation value and ensure the Ukiah Senior Center accurately documents and acknowledges your charitable donation. Please contact the Auction Chair, John McCowen, for additional information or to arrange donation pickup.
          </p>
          
          <p className="mb-5">
            In appreciation, all Live and Silent auction donors will be thanked and acknowledged for their generosity on the event fundraiser literature. All proceeds from this event will benefit the Ukiah Senior Center and help assure the continuation of the many services and activities provided to our local senior and disabled adult communities.
          </p>
          
          <p className="mb-5">
            In addition to the Live and Silent Auctions, you may also support the programs and activities of the Ukiah Senior Center by purchasing a Sponsor Table, which includes reserved seating, complimentary wine, and recognition at the event and in event literature. Please contact John McCowen (707-391-1788) for Sponsor Table information.
          </p>
          
          <p className="mb-5">
            For more than 50 years, the Ukiah Senior Center has enhanced the lives of local seniors and disabled adults. In addition to numerous social, educational, and health-related activities and programs, the Ukiah Senior Center provides local &ldquo;door-through-door&rdquo; transportation services, transportation to out-of-area medical appointments, outreach services to vulnerable adults, dine-in and take-out meal service, and much more. Please visit www.ukiahseniorcenter.org for detailed information about the many services provided by the Ukiah Senior Center, including a link to The Scoop, our monthly newsletter and activity calendar.
          </p>
          
          <p className="mb-6">
            Thank you in advance for your generosity!
          </p>
          
          {/* Signature and QR Code side by side */}
          <div className="flex items-start gap-6 mb-6">
            <div className="flex-1">
              <p className="mb-3">Sincerely,</p>
              <div className="mb-4" style={{ height: '40px' }}></div>
              <p className="mb-2">John McCowen</p>
              <p className="mb-2">Auction Chair</p>
              <p className="mb-0">707-391-1788</p>
            </div>
            
            <div className="text-center">
              <QRCodeDisplay 
                url={auctionUrl}
                title=""
                description=""
                size={80}
              />
              <p className="text-xs text-gray-600 mt-1">Scan to donate items</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          borderTop: '1px solid #E5E7EB',
          paddingTop: '8px',
          marginTop: '32px',
          fontFamily: 'Georgia, serif'
        }}>
          <p style={{ 
            color: '#042148', 
            fontSize: '11px', 
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}>
            UKIAH SENIOR CENTER ⟡ 499 LESLIE ST, UKIAH, CA 95482 ⟡ (707) 462-4343 ⟡ UKIAHSENIORCENTER.ORG
          </p>
        </div>

        {/* Subtle Download PDF button - top right */}
        <div className="fixed top-4 right-4 print:hidden">
          <button 
            onClick={handleDownloadPDF}
            className="bg-gray-600 hover:bg-gray-700 text-white text-xs px-3 py-2 rounded-md shadow-sm transition-colors opacity-75 hover:opacity-100"
            title="Download PDF with perfect formatting"
          >
            📄 Download PDF
          </button>
        </div>
      </div>

      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 0.4in;
            size: letter;
          }
          
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          body {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
            font-family: Georgia, serif !important;
            font-size: 10pt;
            line-height: 1.2;
            margin: 0;
            padding: 0;
          }
          
          .mb-6 {
            margin-bottom: 16px !important;
          }
          
          .mb-5 {
            margin-bottom: 12px !important;
          }
          
          .mb-4 {
            margin-bottom: 10px !important;
          }
          
          .mb-3 {
            margin-bottom: 8px !important;
          }
          
          .mb-2 {
            margin-bottom: 4px !important;
          }
          
          .mb-1 {
            margin-bottom: 2px !important;
          }
          
          header {
            page-break-inside: avoid;
            margin-bottom: 0;
          }
          
          header img {
            width: 100% !important;
            height: auto !important;
            display: block !important;
            page-break-inside: avoid;
          }
          
          .fixed {
            display: none !important;
          }
          
          .max-w-\\[8\\.5in\\] {
            max-width: none !important;
            margin: 0 !important;
            padding: 0.5in !important;
          }
          
          .bg-white {
            background-color: white !important;
          }
          
          .text-gray-800 {
            color: #1f2937 !important;
          }
          
          .text-gray-700 {
            color: #374151 !important;
          }
          
          .text-gray-600 {
            color: #4b5563 !important;
          }
          
          .text-gray-900 {
            color: #111827 !important;
          }
          
          .border {
            border: 1px solid #d1d5db !important;
          }
          
          .border-gray-300 {
            border-color: #d1d5db !important;
          }
          
          .border-gray-400 {
            border-color: #9ca3af !important;
          }
          
          .border-t {
            border-top: 1px solid #9ca3af !important;
          }
          
          strong {
            font-weight: bold !important;
          }
          
          em {
            font-style: italic !important;
          }
        }
      `}</style>
    </div>
  )
}