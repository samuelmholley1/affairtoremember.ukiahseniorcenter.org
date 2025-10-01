'use client'

import QRCodeDisplay from '../../components/QRCodeDisplay'

// Note: Since this is now a client component, metadata should be set in layout.tsx or parent component
export default function QRCodesPage() {
  // Get the base URL for the QR codes (will be the production URL)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://affairtoremember.ukiahseniorcenter.org'
  
  const auctionUrl = `${baseUrl}/auction-donations`
  const sponsorshipUrl = `${baseUrl}/table-sponsors`

  return (
    <div className="bg-white min-h-screen font-serif" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Print-optimized letter layout */}
      <div className="max-w-[8.5in] mx-auto px-8 py-6 print:px-6 print:py-4">

        {/* Letter Content */}
        <div className="mb-6 print:mb-4 text-gray-800 leading-relaxed print:text-sm print:leading-normal">
          <p className="mb-4">Dear Community Partner,</p>
          
          <p className="mb-4">
            Ukiah Senior Center is celebrating more than 50 years of serving the greater Ukiah community. In an effort to remain a viable resource, we are gearing up for a Major Fundraising Gala. <strong>Please consider adding this Gala to your philanthropic budget for 2026.</strong>
          </p>
          
          <p className="mb-4">
            The Gala will be held on Saturday evening, April 11, 2026 at Carl Purdy Hall, Redwood Empire Fairgrounds. Proceeds from this event will directly benefit the Ukiah Senior Center programs and activities for seniors and disabled adults.
          </p>
          
          <p className="mb-4">
            Ukiah Senior Center is dedicated to providing facility-based programs which enhance the quality of life for all Ukiah area seniors and disabled adults, their families and caregivers and to enable seniors to remain as independent as possible for as long as possible. USC depends on donations from our community, grants, and endowments to fund these programs.
          </p>
          
          <p className="mb-4">
            This Gala will be held at the Redwood Empire Fairgrounds in Carl Purdy Hall. The evening will begin with a no-host, full-service bar and appetizers, prepared by Ukiah Senior Center & Lisa Doster. All available as you explore the live and silent auction items.
          </p>
          
          <p className="mb-4">
            The dinner menu includes Shrimp Scampi and Tri Tip, Potatoes, Salad and Bread prepared in partnership with Redwood Empire Lions Club. Following dinner a dessert table will be available for your enjoyment. For your dancing pleasure, <strong><em>Decades</em></strong> will be returning this year.
          </p>
          
          <p className="mb-6">
            To make a donation for the auction, become a sponsor, and RSVP for the gala, please complete the included form and return to Ukiah Senior Center, 499 Leslie St, Ukiah CA or use the QR codes below for easy online access:
          </p>
        </div>

        {/* QR Codes Section - Compact for letter */}
        <div className="mb-6 print:mb-4">
          <div className="grid grid-cols-2 gap-6 print:gap-4">
            
            {/* Auction Donations QR */}
            <div className="text-center border border-gray-300 p-3 print:p-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 print:text-base print:mb-1">
                Auction Donations
              </h3>
              <QRCodeDisplay 
                url={auctionUrl}
                title="Auction Donations"
                description="Scan to donate items"
                size={100}
              />
              <p className="text-xs text-gray-600 mt-1 print:text-[10px]">
                Scan to donate auction items online
              </p>
            </div>

            {/* Sponsorships QR */}
            <div className="text-center border border-gray-300 p-3 print:p-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 print:text-base print:mb-1">
                Tickets & Sponsorships
              </h3>
              <QRCodeDisplay 
                url={sponsorshipUrl}
                title="Sponsorships"
                description="Scan for tickets and sponsorships"
                size={100}
              />
              <p className="text-xs text-gray-600 mt-1 print:text-[10px]">
                Scan for tickets and sponsorship levels
              </p>
            </div>
          </div>
        </div>

        {/* Sponsorship Table - Letter Format */}
        <div className="mb-6 print:mb-4">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-4 print:text-lg print:mb-2">
            Sponsorship & Special Ticket Offers
          </h2>
          
          {/* Compact 2x2 Grid for Print */}
          <div className="grid grid-cols-2 gap-3 print:gap-2 text-sm print:text-xs">
            
            {/* Diamond Sponsor */}
            <div className="border border-gray-400 p-3 print:p-2">
              <div className="flex justify-between items-center mb-2 print:mb-1">
                <strong className="text-blue-800">Diamond Sponsor</strong>
                <strong className="text-blue-600">$2,500</strong>
              </div>
              <div className="text-xs print:text-[10px] text-gray-700 leading-tight">
                2 tables, seating 16 guests, 4 bottles of wine, recognition on advertising, banner at the event and media acknowledgement
              </div>
            </div>

            {/* Platinum Sponsor */}
            <div className="border border-gray-400 p-3 print:p-2">
              <div className="flex justify-between items-center mb-2 print:mb-1">
                <strong className="text-purple-800">Platinum Sponsor</strong>
                <strong className="text-purple-600">$1,500</strong>
              </div>
              <div className="text-xs print:text-[10px] text-gray-700 leading-tight">
                1 table, seating 8 guests, 2 bottles of wine, recognition on advertising, banner at the event and media acknowledgement
              </div>
            </div>

            {/* Gold Sponsor */}
            <div className="border border-gray-400 p-3 print:p-2">
              <div className="flex justify-between items-center mb-2 print:mb-1">
                <strong className="text-yellow-700">Gold Sponsor</strong>
                <strong className="text-yellow-600">$750</strong>
              </div>
              <div className="text-xs print:text-[10px] text-gray-700 leading-tight">
                4 Tickets, reserved seating at a sponsor table, 1 bottle of wine and media acknowledgement
              </div>
            </div>

            {/* Ruby Sponsor */}
            <div className="border border-gray-400 p-3 print:p-2">
              <div className="flex justify-between items-center mb-2 print:mb-1">
                <strong className="text-red-800">Ruby Sponsor</strong>
                <strong className="text-red-600">$400</strong>
              </div>
              <div className="text-xs print:text-[10px] text-gray-700 leading-tight">
                2 Tickets, reserved seating at a sponsor table, 1 bottle of wine and media acknowledgement
              </div>
            </div>
          </div>
        </div>

        {/* Tax Information */}
        <div className="text-center text-sm print:text-xs text-gray-700 border-t border-gray-400 pt-3 print:pt-2">
          <p className="mb-1">
            Thank you for your consideration. Your donation and/or sponsorship is tax deductible.
          </p>
          <p>
            Ukiah Senior Center is a 501(c)3 charitable organization. <strong>Tax ID #: 23-7258082</strong>
          </p>
        </div>

        {/* Subtle Download PDF button - top right */}
        <div className="fixed top-4 right-4 print:hidden">
          <button 
            onClick={() => {
              // Trigger print which allows saving as PDF directly to Downloads
              window.print();
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white text-xs px-3 py-2 rounded-md shadow-sm transition-colors opacity-75 hover:opacity-100"
            title="Download as PDF"
          >
            📄 PDF
          </button>
        </div>
      </div>

      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 0.5in;
            size: letter;
          }
          body {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
            font-family: Georgia, serif !important;
            font-size: 11pt;
            line-height: 1.3;
          }
          * {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
            font-family: Georgia, serif !important;
          }
        }
      `}</style>
    </div>
  )
}