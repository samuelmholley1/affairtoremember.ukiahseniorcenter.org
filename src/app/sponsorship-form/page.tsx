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
      <div className="max-w-[8.5in] mx-auto px-6 py-4 print:px-4 print:py-2 pt-4">

        {/* Header with QR code positioned right */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-1">
              Ukiah Senior Center
            </h1>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              An Affair to Remember
            </h2>
            <h3 className="text-base text-gray-700">
              Saturday, April 11, 2026
            </h3>
          </div>
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

        {/* Main Content */}
        <div className="space-y-2">
          
          {/* Opening Statement */}
          <p className="text-sm font-medium mb-2">
            I would like to support the Ukiah Senior Center by purchasing tickets and/or being a sponsor.
          </p>

          {/* Sponsorship Levels Table */}
          <div className="mb-3">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-1.5 pr-2 align-top w-6">
                    <span className="text-base">☐</span>
                  </td>
                  <td className="py-1.5 flex-1">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-sm font-semibold">Diamond Sponsor</span>
                      <span className="text-sm font-bold">$2,500 (Card: $2,600)</span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      2 Reserved Tables for 8, 4 bottles of wine, Recognition on advertising, Banner at event, Media acknowledgement
                    </p>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-1.5 pr-2 align-top w-6">
                    <span className="text-base">☐</span>
                  </td>
                  <td className="py-1.5 flex-1">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-sm font-semibold">Platinum Sponsor</span>
                      <span className="text-sm font-bold">$1,500 (Card: $1,560)</span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      1 Reserved table for 8, 2 bottles of wine, Recognition on advertising, Banner at event, Media acknowledgement
                    </p>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-1.5 pr-2 align-top w-6">
                    <span className="text-base">☐</span>
                  </td>
                  <td className="py-1.5 flex-1">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-sm font-semibold">Gold Sponsor</span>
                      <span className="text-sm font-bold">$750 (Card: $780)</span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      4 Tickets, 1 bottle of wine, reserved seating and media acknowledgement
                    </p>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-1.5 pr-2 align-top w-6">
                    <span className="text-base">☐</span>
                  </td>
                  <td className="py-1.5 flex-1">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-sm font-semibold">Ruby Sponsor</span>
                      <span className="text-sm font-bold">$400 (Card: $416)</span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      2 Tickets, 1 bottle of wine, reserved Seating and media acknowledgement
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Tickets and Donations */}
          <div className="space-y-2 mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm">#</span>
              <div className="border-b border-black w-14 h-5"></div>
              <span className="text-sm">Single Tickets @ $100.00 (Card: $104) each; after 3/28/26 $110.00 (Card: $114) each</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm">Enclosed is my monetary donation in the amount of $</span>
              <div className="border-b border-black w-20 h-5"></div>
            </div>
          </div>

          {/* Contact Information Table */}
          <div className="mb-3">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="pb-2 pr-4 w-1/2">
                    <span className="text-sm">Name:</span>
                    <div className="border-b border-black w-full h-5 mt-1"></div>
                  </td>
                  <td className="pb-2 w-1/2">
                    <span className="text-sm">Address:</span>
                    <div className="border-b border-black w-full h-5 mt-1"></div>
                  </td>
                </tr>
                <tr>
                  <td className="pr-4 w-1/2">
                    <span className="text-sm">Phone:</span>
                    <div className="border-b border-black w-full h-5 mt-1"></div>
                  </td>
                  <td className="w-1/2">
                    <span className="text-sm">Email:</span>
                    <div className="border-b border-black w-full h-5 mt-1"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment Information */}
          <div className="space-y-2 border-t border-gray-300 pt-2">
            <div>
              <p className="text-sm font-semibold mb-1">CREDIT CARD: Your credit card information will not be retained after transaction</p>
              <table className="w-full mb-2">
                <tbody>
                  <tr>
                    <td className="pr-2 w-1/2">
                      <span className="text-sm">CC#:</span>
                      <div className="border-b border-black w-full h-5 mt-1"></div>
                    </td>
                    <td className="pr-2 w-1/4">
                      <span className="text-sm">Exp:</span>
                      <div className="border-b border-black w-full h-5 mt-1"></div>
                    </td>
                    <td className="w-1/4">
                      <span className="text-sm">CVC:</span>
                      <div className="border-b border-black w-full h-5 mt-1"></div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="pr-4 w-1/2">
                      <span className="text-sm">Name on card:</span>
                      <div className="border-b border-black w-full h-5 mt-1"></div>
                    </td>
                    <td className="w-1/2">
                      <span className="text-sm">Zip:</span>
                      <div className="border-b border-black w-full h-5 mt-1"></div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 p-2 rounded">
              <p className="text-sm font-semibold mb-1">CHECK:</p>
              <p className="text-sm leading-relaxed">
                Please make checks payable to Ukiah Senior Center and write &ldquo;AATR&rdquo; in the memo.<br/>
                Mail this form with payment to: Ukiah Senior Center, Attn: AATR, 499 Leslie St., Ukiah, CA 95482
              </p>
            </div>
          </div>

          {/* Ticket Delivery Options */}
          <div className="pt-1">
            <p className="text-sm font-semibold mb-1">Ticket Delivery Options:</p>
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2">
                <span className="text-sm">☐</span>
                <span className="text-sm">Pick Up @ USC</span>
              </label>
              <label className="flex items-center space-x-2">
                <span className="text-sm">☐</span>
                <span className="text-sm">Mail</span>
              </label>
              <label className="flex items-center space-x-2">
                <span className="text-sm">☐</span>
                <span className="text-sm">Will Call</span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center border-t border-gray-300 pt-1 mt-2">
          <p className="text-xs font-semibold text-gray-700" style={{ letterSpacing: '0.3px', fontSize: '10px' }}>
            UKIAH SENIOR CENTER ⟡ 499 LESLIE ST, UKIAH, CA 95482 ⟡ (707) 462-4343 ⟡ UKIAHSENIORCENTER.ORG
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
            margin: 0.4in;
            size: letter;
          }
          
          body {
            font-family: Georgia, serif !important;
            font-size: 9pt;
            line-height: 1.15;
          }
          
          .fixed {
            display: none !important;
          }
          
          .min-h-screen {
            min-height: auto !important;
          }
          
          table {
            page-break-inside: avoid;
          }
          
          .space-y-2 > * + * {
            margin-top: 4px !important;
          }
          
          .mb-3 {
            margin-bottom: 6px !important;
          }
          
          .mb-2 {
            margin-bottom: 4px !important;
          }
          
          .mb-1 {
            margin-bottom: 2px !important;
          }
          
          .py-1\\.5 {
            padding-top: 3px !important;
            padding-bottom: 3px !important;
          }
          
          .pb-2 {
            padding-bottom: 4px !important;
          }
          
          .pt-2 {
            padding-top: 4px !important;
          }
          
          .pt-1 {
            padding-top: 2px !important;
          }
          
          .pt-4 {
            padding-top: 8px !important;
          }
          
          .mt-2 {
            margin-top: 4px !important;
          }
          
          .h-5 {
            height: 12px !important;
          }
          
          .leading-relaxed {
            line-height: 1.2 !important;
          }
          
          .text-xs {
            font-size: 8pt !important;
          }
          
          .text-sm {
            font-size: 8.5pt !important;
          }
          
          .text-base {
            font-size: 9pt !important;
          }
          
          .text-lg {
            font-size: 10pt !important;
          }
          
          .text-xl {
            font-size: 11pt !important;
          }
          
          .p-2 {
            padding: 4px !important;
          }
        }
      `}</style>
    </div>
  )
}