'use client'

import QRCodeDisplay from '../../components/QRCodeDisplay'

export default function SponsorshipFormPage() {
  // Get the base URL for the QR codes (will be the production URL)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://affairtoremember.ukiahseniorcenter.org'
  
  const sponsorshipUrl = `${baseUrl}/table-sponsors`

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
          filename: 'sponsorship-form.pdf'
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
      a.download = 'sponsorship-form.pdf';
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

  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Print-optimized letter layout */}
      <div className="max-w-[8.5in] mx-auto px-6 py-4 print:px-4 print:py-3">

        {/* Header with Banner */}
        <div className="text-center mb-6">
          <img 
            src="/aatr_banner.png" 
            alt="An Affair to Remember Banner" 
            className="w-full max-w-2xl mx-auto mb-4"
            style={{ maxHeight: '120px', objectFit: 'contain' }}
          />
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Ukiah Senior Center
          </h1>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            An Affair to Remember
          </h2>
          <h3 className="text-base text-gray-700">
            Saturday, April 11, 2026
          </h3>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          
          {/* Opening Statement */}
          <p className="text-sm font-medium">
            I would like to support the Ukiah Senior Center by purchasing tickets and/or being a sponsor.
          </p>

          {/* Sponsorship Levels */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3 border-b border-gray-200 pb-3">
              <span className="text-lg mt-1">☐</span>
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-semibold">Diamond Sponsor</span>
                  <span className="font-bold">$2,500</span>
                </div>
                <p className="text-sm text-gray-700">
                  2 Reserved Tables for 8, 4 bottles of wine.<br/>
                  Recognition on advertising, Banner at the event and Media acknowledgement
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 border-b border-gray-200 pb-3">
              <span className="text-lg mt-1">☐</span>
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-semibold">Platinum Sponsor</span>
                  <span className="font-bold">$1,500</span>
                </div>
                <p className="text-sm text-gray-700">
                  1 Reserved table for 8, 2 bottles of wine.<br/>
                  Recognition on advertising, Banner at the event and Media acknowledgement
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 border-b border-gray-200 pb-3">
              <span className="text-lg mt-1">☐</span>
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-semibold">Gold Sponsor</span>
                  <span className="font-bold">$ 750</span>
                </div>
                <p className="text-sm text-gray-700">
                  4 Tickets, 1 bottle of wine, reserved seating and media acknowledgement
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 border-b border-gray-200 pb-3">
              <span className="text-lg mt-1">☐</span>
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-semibold">Ruby Sponsor</span>
                  <span className="font-bold">$ 400</span>
                </div>
                <p className="text-sm text-gray-700">
                  2 Tickets, 1 bottle of wine, reserved Seating and media acknowledgement
                </p>
              </div>
            </div>
          </div>

          {/* Tickets and Donations */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm">#</span>
              <div className="border-b border-black w-16 h-5"></div>
              <span className="text-sm">Single Tickets @ $100.00 each; after 3/28/26 $110.00 each</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm">Enclosed is my monetary donation in the amount of $</span>
              <div className="border-b border-black w-20 h-5"></div>
            </div>

            <div>
              <p className="text-sm mb-2">I would like to donate an item for the Silent Auction (Description and Value)</p>
              <div className="space-y-2">
                <div className="border-b border-black w-full h-5"></div>
                <div className="border-b border-black w-full h-5"></div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm">Name:</span>
              <div className="border-b border-black w-full h-5 mt-1"></div>
            </div>
            <div>
              <span className="text-sm">Address:</span>
              <div className="border-b border-black w-full h-5 mt-1"></div>
            </div>
            <div>
              <span className="text-sm">Phone:</span>
              <div className="border-b border-black w-full h-5 mt-1"></div>
            </div>
            <div>
              <span className="text-sm">Email:</span>
              <div className="border-b border-black w-full h-5 mt-1"></div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-4 border-t border-gray-300 pt-4">
            <div>
              <p className="text-sm font-semibold mb-3">CREDIT CARD: Your credit card information will not be retained after transaction</p>
              <div className="grid grid-cols-4 gap-3 mb-2">
                <div className="col-span-2">
                  <span className="text-sm">CC#:</span>
                  <div className="border-b border-black w-full h-5 mt-1"></div>
                </div>
                <div>
                  <span className="text-sm">Exp:</span>
                  <div className="border-b border-black w-full h-5 mt-1"></div>
                </div>
                <div>
                  <span className="text-sm">CVC:</span>
                  <div className="border-b border-black w-full h-5 mt-1"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-sm">Name on card:</span>
                  <div className="border-b border-black w-full h-5 mt-1"></div>
                </div>
                <div>
                  <span className="text-sm">Zip:</span>
                  <div className="border-b border-black w-full h-5 mt-1"></div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm font-semibold mb-2">CHECK:</p>
              <p className="text-sm">
                Please make checks payable to Ukiah Senior Center and write &quot;AATR&quot; in the memo.<br/>
                Mail this form with payment to: Ukiah Senior Center, Attn: AATR, 499 Leslie St., Ukiah, CA 95482
              </p>
            </div>
          </div>

          {/* Ticket Delivery Options */}
          <div>
            <p className="text-sm font-semibold mb-2">Ticket Delivery Options</p>
            <div className="space-y-1">
              <label className="flex items-center space-x-2">
                <span className="text-sm">☐</span>
                <span className="text-sm">Pick Up Tickets @ USC</span>
              </label>
              <label className="flex items-center space-x-2">
                <span className="text-sm">☐</span>
                <span className="text-sm">MAIL</span>
              </label>
              <label className="flex items-center space-x-2">
                <span className="text-sm">☐</span>
                <span className="text-sm">Hold my tickets at Will Call</span>
              </label>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex justify-end">
            <div className="text-center">
              <QRCodeDisplay 
                url={sponsorshipUrl}
                title=""
                description=""
                size={80}
              />
              <p className="text-xs text-gray-600 mt-1">Complete Online</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center border-t border-gray-300 pt-3 mt-8">
          <p className="text-xs font-semibold text-gray-700" style={{ letterSpacing: '0.5px' }}>
            UKIAH SENIOR CENTER ⟡ 499 LESLIE STREET ⟡ UKIAH, CA 95482 ⟡ (707)462-4343 ⟡ UKIAHSENIORCENTER.ORG
          </p>
        </div>

        {/* Download PDF button */}
        <div className="fixed top-4 right-4 print:hidden">
          <button 
            onClick={handleDownloadPDF}
            className="bg-gray-600 hover:bg-gray-700 text-white text-xs px-3 py-2 rounded-md shadow-sm transition-colors opacity-75 hover:opacity-100"
            title="Download PDF"
          >
            📄 Download PDF
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
            font-family: Georgia, serif !important;
            font-size: 11pt;
            line-height: 1.3;
            margin: 0;
            padding: 0;
          }
          
          .fixed {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}