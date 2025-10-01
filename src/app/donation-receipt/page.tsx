'use client'

import QRCodeDisplay from '../../components/QRCodeDisplay'

export default function DonationReceiptPage() {
  // Get the base URL for the QR codes (will be the production URL)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://affairtoremember.ukiahseniorcenter.org'
  
  const donationUrl = `${baseUrl}/auction-donations`

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
          filename: 'donation-receipt.pdf'
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
      a.download = 'donation-receipt.pdf';
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
        <div className="flex justify-between items-start mb-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-1">Tax Receipt</h1>
            <p className="text-sm font-semibold">Tax ID# 23-7258082</p>
          </div>
          <div className="text-center">
            <QRCodeDisplay 
              url={donationUrl}
              title=""
              description=""
              size={80}
            />
            <p className="text-xs text-gray-600 mt-1">Log this online</p>
          </div>
        </div>

        {/* Receipt Header */}
        <div className="flex justify-between items-center mb-3 border-b border-gray-300 pb-1">
          <div className="flex items-center space-x-4">
            <span className="text-sm">Date:</span>
            <div className="border-b border-black w-24 h-5"></div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Donation Value: $</span>
            <div className="border-b border-black w-24 h-5"></div>
          </div>
        </div>

        {/* Organization Info */}
        <div className="mb-3">
          <div className="text-sm space-y-0.5">
            <p className="font-semibold">Ukiah Senior Center</p>
            <p>499 Leslie Street</p>
            <p>Ukiah, CA 95482</p>
            <p>707-462-4343</p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mb-3 p-2 bg-gray-50 rounded">
          <p className="text-xs leading-snug">
            Ukiah Senior Center&apos;s mission is to enhance and improve the quality of life for all Ukiah seniors, adults with disabilities, their families and caregivers, and to enable seniors to remain as independent as possible for as long as possible.
          </p>
          <p className="text-xs leading-snug mt-2">
            Our sponsors, donors, members and volunteers have enabled us to carry out our mission of service.
          </p>
          <p className="text-xs font-semibold mt-2">
            Thank you for your generous donation!
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-400 my-3" style={{ borderTop: '2px dashed #9CA3AF' }}></div>

        {/* Records Section */}
        <div className="space-y-2">
          <p className="text-sm font-semibold">For Ukiah Senior Center donations records:</p>

                    <div className="flex items-center space-x-2">
            <span className="text-sm">Date:</span>
            <div className="border-b border-black w-32 h-4"></div>
          </div>

          <div>
            <p className="text-sm mb-1">Donation Description:</p>
            <div className="space-y-1">
              <div className="border-b border-black w-full h-4"></div>
              <div className="border-b border-black w-full h-4"></div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm">Donation Value: $</span>
            <div className="border-b border-black w-24 h-4"></div>
          </div>

          {/* Donor Information - Grid Layout */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-xs">Business Name:</span>
              <div className="border-b border-black w-full h-4 mt-0.5"></div>
            </div>
            <div>
              <span className="text-xs">Donor Name:</span>
              <div className="border-b border-black w-full h-4 mt-0.5"></div>
            </div>
            <div>
              <span className="text-xs">Donor Address:</span>
              <div className="border-b border-black w-full h-4 mt-0.5"></div>
            </div>
            <div>
              <span className="text-xs">Donor Phone:</span>
              <div className="border-b border-black w-full h-4 mt-0.5"></div>
            </div>
            <div className="col-span-2">
              <span className="text-xs">Donor Email:</span>
              <div className="border-b border-black w-full h-4 mt-0.5"></div>
            </div>
          </div>

          {/* Special Events Question */}
          <div className="flex items-center space-x-2 pt-1">
            <span className="text-xs">Would you like to receive information about special events at Ukiah Senior Center?</span>
            <div className="flex items-center space-x-1">
              <span className="text-xs">( )</span>
              <span className="text-xs">Yes</span>
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
          
          .space-y-2 > * + * {
            margin-top: 4px !important;
          }
          
          .space-y-1 > * + * {
            margin-top: 2px !important;
          }
          
          .space-y-0\\.5 > * + * {
            margin-top: 1px !important;
          }
          
          .mb-3 {
            margin-bottom: 6px !important;
          }
          
          .mb-1 {
            margin-bottom: 2px !important;
          }
          
          .mt-2 {
            margin-top: 4px !important;
          }
          
          .mt-0\\.5 {
            margin-top: 1px !important;
          }
          
          .my-3 {
            margin-top: 6px !important;
            margin-bottom: 6px !important;
          }
          
          .pt-4 {
            padding-top: 8px !important;
          }
          
          .pt-1 {
            padding-top: 2px !important;
          }
          
          .p-2 {
            padding: 4px !important;
          }
          
          .pb-1 {
            padding-bottom: 2px !important;
          }
          
          .h-4 {
            height: 10px !important;
          }
          
          .gap-2 {
            gap: 3px !important;
          }
          
          .leading-snug {
            line-height: 1.1 !important;
          }
          
          .text-xs {
            font-size: 7.5pt !important;
          }
          
          .text-sm {
            font-size: 8.5pt !important;
          }
          
          .text-xl {
            font-size: 10pt !important;
          }
        }
      `}</style>
    </div>
  )
}