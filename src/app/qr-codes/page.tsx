'use client'

import QRCodeDisplay from '../../components/QRCodeDisplay'

// Note: Since this is now a client component, metadata should be set in layout.tsx or parent component
export default function QRCodesPage() {
  // Get the base URL for the QR codes (will be the production URL)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://affairtoremember.ukiahseniorcenter.org'
  
  const auctionUrl = `${baseUrl}/auction-donations`
  const sponsorshipUrl = `${baseUrl}/table-sponsors`

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            QR Codes for Easy Access
          </h1>
          <p className="text-xl text-gray-600">
            Scan these codes with your phone to quickly access our donation and sponsorship forms
          </p>
        </div>

        {/* QR Codes Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          
          {/* Auction Donations QR Code */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🎁 Auction Donations
            </h2>
            <p className="text-gray-600 mb-6">
              Donate items, services, or experiences for our auction
            </p>
            
            <QRCodeDisplay 
              url={auctionUrl}
              title="Auction Donations"
              description="Scan to donate auction items"
            />
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 font-mono break-all">
                {auctionUrl}
              </p>
            </div>
          </div>

          {/* Table Sponsorships QR Code */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🎫 Tickets & Sponsorships
            </h2>
            <p className="text-gray-600 mb-6">
              Purchase tickets or become a sponsor for our event
            </p>
            
            <QRCodeDisplay 
              url={sponsorshipUrl}
              title="Table Sponsorships"
              description="Scan for tickets and sponsorships"
            />
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 font-mono break-all">
                {sponsorshipUrl}
              </p>
            </div>
          </div>
        </div>

        {/* Sponsorship Table */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 text-center">
              <h2 className="text-3xl font-bold mb-2">Sponsorship & Special Ticket Offers</h2>
              <p className="text-blue-100">Support the Ukiah Senior Center while enjoying exclusive benefits</p>
            </div>
            
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                
                {/* Diamond Sponsor */}
                <div className="border-2 border-blue-200 rounded-lg p-6 bg-gradient-to-br from-blue-50 to-blue-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-blue-900">💎 Diamond Sponsor</h3>
                    <span className="text-2xl font-bold text-blue-600">$2,500</span>
                  </div>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li>• 2 tables, seating 16 guests</li>
                    <li>• 4 bottles of wine</li>
                    <li>• Recognition on advertising</li>
                    <li>• Banner at the event</li>
                    <li>• Media acknowledgement</li>
                  </ul>
                </div>

                {/* Platinum Sponsor */}
                <div className="border-2 border-purple-200 rounded-lg p-6 bg-gradient-to-br from-purple-50 to-purple-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-purple-900">🏆 Platinum Sponsor</h3>
                    <span className="text-2xl font-bold text-purple-600">$1,500</span>
                  </div>
                  <ul className="text-sm text-purple-800 space-y-2">
                    <li>• 1 table, seating 8 guests</li>
                    <li>• 2 bottles of wine</li>
                    <li>• Recognition on advertising</li>
                    <li>• Banner at the event</li>
                    <li>• Media acknowledgement</li>
                  </ul>
                </div>

                {/* Gold Sponsor */}
                <div className="border-2 border-yellow-200 rounded-lg p-6 bg-gradient-to-br from-yellow-50 to-yellow-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-yellow-900">🥇 Gold Sponsor</h3>
                    <span className="text-2xl font-bold text-yellow-600">$750</span>
                  </div>
                  <ul className="text-sm text-yellow-800 space-y-2">
                    <li>• 4 Tickets</li>
                    <li>• Reserved seating at a sponsor table</li>
                    <li>• 1 bottle of wine</li>
                    <li>• Media acknowledgement</li>
                  </ul>
                </div>

                {/* Ruby Sponsor */}
                <div className="border-2 border-red-200 rounded-lg p-6 bg-gradient-to-br from-red-50 to-red-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-red-900">💎 Ruby Sponsor</h3>
                    <span className="text-2xl font-bold text-red-600">$400</span>
                  </div>
                  <ul className="text-sm text-red-800 space-y-2">
                    <li>• 2 Tickets</li>
                    <li>• Reserved seating at a sponsor table</li>
                    <li>• 1 bottle of wine</li>
                    <li>• Media acknowledgement</li>
                  </ul>
                </div>
              </div>

              {/* Tax Deductible Notice */}
              <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg text-center">
                <p className="text-green-800 font-semibold mb-2">
                  Thank you for your consideration. Your donation and/or sponsorship is tax deductible.
                </p>
                <p className="text-sm text-green-700">
                  Ukiah Senior Center is a 501(c)3 charitable organization. 
                  <br />
                  <strong>Tax ID #: 23-7258082</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">How to Use QR Codes</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">📱</div>
              <h4 className="font-semibold text-gray-900 mb-2">Step 1</h4>
              <p className="text-sm text-gray-600">Open your phone&apos;s camera app</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-semibold text-gray-900 mb-2">Step 2</h4>
              <p className="text-sm text-gray-600">Point camera at the QR code</p>
            </div>
            <div>
              <div className="text-3xl mb-2">👆</div>
              <h4 className="font-semibold text-gray-900 mb-2">Step 3</h4>
              <p className="text-sm text-gray-600">Tap the notification to open the form</p>
            </div>
          </div>
        </div>

        {/* Print Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            📄 Print-Friendly Version
          </h3>
          <p className="text-blue-800 mb-4">
            This page is optimized for printing. Use your browser&apos;s print function to create physical copies of these QR codes for flyers, posters, or handouts.
          </p>
          <button 
            onClick={() => window.print()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            🖨️ Print QR Codes
          </button>
        </div>
      </div>
    </div>
  )
}