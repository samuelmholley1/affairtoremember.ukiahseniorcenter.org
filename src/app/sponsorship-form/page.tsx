'use client'

import { useState, useEffect } from 'react'
import QRCodeDisplay from '../../components/QRCodeDisplay'

export default function SponsorshipFormPage() {
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
  
  // Brand colors (HEX only) - Subtle palette
  const colors = {
    navy: '#042148',
    burgundy: '#9F3833',
    black: '#000000',
    white: '#FFFFFF',
    neutralStroke: '#E5E7EB',
    lightGray: '#F9FAFB',
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
              Enter password to access sponsorship form
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

        {/* Main Content */}
        <div className="space-y-2" style={{ paddingTop: '8px' }}>
          
          {/* Opening Statement */}
          <p className="text-sm font-medium mb-2">
            I would like to support the Ukiah Senior Center by purchasing tickets and/or being a sponsor.
          </p>

          {/* Integrated Full-Width Table with QR Code */}
          <div className="integrated-table" style={{ 
            marginBottom: '12px',
            border: `1px solid ${colors.neutralStroke}`,
            borderRadius: '0px'
          }}>
            
            {/* Full-width gray header */}
            <div style={{
              backgroundColor: colors.lightGray,
              display: 'flex',
              borderBottom: `1px solid ${colors.neutralStroke}`
            }}>
              {/* Table headers - using same flex values as body */}
              <div style={{ flex: '2.5', display: 'flex' }}>
                <div style={{
                  color: colors.navy,
                  fontWeight: '600',
                  fontSize: '11px',
                  padding: '6px 8px',
                  textAlign: 'center',
                  borderRight: `1px solid ${colors.neutralStroke}`,
                  flex: '0 0 12%'
                }}>
                  Select
                </div>
                <div style={{
                  color: colors.navy,
                  fontWeight: '600',
                  fontSize: '11px',
                  padding: '6px 8px',
                  textAlign: 'center',
                  borderRight: `1px solid ${colors.neutralStroke}`,
                  flex: '0 0 16%'
                }}>
                  Tier
                </div>
                <div style={{
                  color: colors.navy,
                  fontWeight: '600',
                  fontSize: '11px',
                  padding: '6px 8px',
                  textAlign: 'center',
                  borderRight: `1px solid ${colors.neutralStroke}`,
                  flex: '0 0 18%'
                }}>
                  Price
                </div>
                <div style={{
                  color: colors.navy,
                  fontWeight: '600',
                  fontSize: '11px',
                  padding: '6px 8px',
                  textAlign: 'center',
                  borderRight: `1px solid ${colors.neutralStroke}`,
                  flex: '0 0 54%'
                }}>
                  Benefits
                </div>
              </div>
              {/* QR section header */}
              <div style={{
                flex: '1',
                color: colors.navy,
                fontWeight: '600',
                fontSize: '11px',
                padding: '6px 8px',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                Online Submission
              </div>
            </div>

            {/* Content rows */}
            <div style={{ display: 'flex' }}>
              {/* Left: Table content */}
              <div style={{ flex: '2.5' }}>
                {/* Diamond row */}
                <div style={{ display: 'flex', borderBottom: `1px solid ${colors.neutralStroke}` }}>
                  <div style={{
                    color: colors.navy,
                    fontWeight: '600',
                    fontSize: '11px',
                    padding: '4px 8px',
                    borderRight: `1px solid ${colors.neutralStroke}`,
                    textAlign: 'center',
                    flex: '0 0 12%'
                  }}>
                    ☐
                  </div>
                  <div style={{
                    color: colors.burgundy,
                    fontWeight: '600',
                    fontSize: '11px',
                    padding: '4px 8px',
                    borderRight: `1px solid ${colors.neutralStroke}`,
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                    flex: '0 0 16%'
                  }}>
                    Diamond
                  </div>
                  <div style={{
                    color: colors.burgundy,
                    fontWeight: '600',
                    fontSize: '11px',
                    padding: '4px 8px',
                    textAlign: 'center',
                    borderRight: `1px solid ${colors.neutralStroke}`,
                    whiteSpace: 'nowrap',
                    flex: '0 0 18%'
                  }}>
                    $2,500<br/>
                    <span style={{ fontSize: '9px', color: colors.gray }}>Card: $2,600</span>
                  </div>
                  <div style={{
                    color: colors.black,
                    fontWeight: '400',
                    fontSize: '10px',
                    padding: '4px 8px 4px 16px',
                    borderRight: `1px solid ${colors.neutralStroke}`,
                    textAlign: 'left',
                    lineHeight: '1.3',
                    flex: '0 0 54%'
                  }}>
                    • 2 Reserved Tables and 16 tickets<br/>
                    • 4 bottles of wine<br/>
                    • Recognition on advertising<br/>
                    • Media acknowledgement
                  </div>
                </div>

                {/* Platinum row */}
                {/* Platinum row */}
                <div style={{ display: 'flex', borderBottom: `1px solid ${colors.neutralStroke}` }}>
                  <div style={{
                    color: colors.navy,
                    fontWeight: '600',
                    fontSize: '11px',
                    padding: '4px 8px',
                    borderRight: `1px solid ${colors.neutralStroke}`,
                    textAlign: 'center',
                    flex: '0 0 12%'
                  }}>
                    ☐
                  </div>
                  <div style={{
                    color: colors.navy,
                    fontWeight: '600',
                    fontSize: '11px',
                    padding: '4px 8px',
                    borderRight: `1px solid ${colors.neutralStroke}`,
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                    flex: '0 0 16%'
                  }}>
                    Platinum
                  </div>
                  <div style={{
                    color: colors.navy,
                    fontWeight: '600',
                    fontSize: '11px',
                    padding: '4px 8px',
                    textAlign: 'center',
                    borderRight: `1px solid ${colors.neutralStroke}`,
                    whiteSpace: 'nowrap',
                    flex: '0 0 18%'
                  }}>
                    $1,500<br/>
                    <span style={{ fontSize: '9px', color: colors.gray }}>Card: $1,560</span>
                  </div>
                  <div style={{
                    color: colors.black,
                    fontWeight: '400',
                    fontSize: '10px',
                    padding: '4px 8px 4px 16px',
                    borderRight: `1px solid ${colors.neutralStroke}`,
                    textAlign: 'left',
                    lineHeight: '1.3',
                    flex: '0 0 54%'
                  }}>
                    • 1 Reserved table and 8 tickets<br/>
                    • 2 bottles of wine<br/>
                    • Recognition on advertising<br/>
                    • Media acknowledgement
                  </div>
                </div>                {/* Gold row */}
                <div style={{ display: 'flex', borderBottom: `1px solid ${colors.neutralStroke}` }}>
                  <div style={{
                    color: colors.navy,
                    fontWeight: '600',
                    fontSize: '11px',
                    padding: '4px 8px',
                    borderRight: `1px solid ${colors.neutralStroke}`,
                    textAlign: 'center',
                    flex: '0 0 12%'
                  }}>
                    ☐
                  </div>
                  <div style={{
                    color: colors.burgundy,
                    fontWeight: '600',
                    fontSize: '11px',
                    padding: '4px 8px',
                    borderRight: `1px solid ${colors.neutralStroke}`,
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                    flex: '0 0 16%'
                  }}>
                    Gold
                  </div>
                  <div style={{
                    color: colors.burgundy,
                    fontWeight: '600',
                    fontSize: '11px',
                    padding: '4px 8px',
                    textAlign: 'center',
                    borderRight: `1px solid ${colors.neutralStroke}`,
                    whiteSpace: 'nowrap',
                    flex: '0 0 18%'
                  }}>
                    $750<br/>
                    <span style={{ fontSize: '9px', color: colors.gray }}>Card: $780</span>
                  </div>
                  <div style={{
                    color: colors.black,
                    fontWeight: '400',
                    fontSize: '10px',
                    padding: '4px 8px 4px 16px',
                    borderRight: `1px solid ${colors.neutralStroke}`,
                    textAlign: 'left',
                    lineHeight: '1.3',
                    flex: '0 0 54%'
                  }}>
                    • 4 Tickets<br/>
                    • 1 bottle of wine<br/>
                    • Reserved seating at a sponsor table<br/>
                    • Media acknowledgement
                  </div>
                </div>

                {/* Ruby row */}
                <div style={{ display: 'flex', borderBottom: `1px solid ${colors.neutralStroke}` }}>
                  <div style={{
                    color: colors.navy,
                    fontWeight: '600',
                    fontSize: '11px',
                    padding: '4px 8px',
                    borderRight: `1px solid ${colors.neutralStroke}`,
                    textAlign: 'center',
                    flex: '0 0 12%'
                  }}>
                    ☐
                  </div>
                  <div style={{
                    color: colors.navy,
                    fontWeight: '600',
                    fontSize: '11px',
                    padding: '4px 8px',
                    borderRight: `1px solid ${colors.neutralStroke}`,
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                    flex: '0 0 16%'
                  }}>
                    Ruby
                  </div>
                  <div style={{
                    color: colors.navy,
                    fontWeight: '600',
                    fontSize: '11px',
                    padding: '4px 8px',
                    textAlign: 'center',
                    borderRight: `1px solid ${colors.neutralStroke}`,
                    whiteSpace: 'nowrap',
                    flex: '0 0 18%'
                  }}>
                    $400<br/>
                    <span style={{ fontSize: '9px', color: colors.gray }}>Card: $416</span>
                  </div>
                  <div style={{
                    color: colors.black,
                    fontWeight: '400',
                    fontSize: '10px',
                    padding: '4px 8px 4px 16px',
                    borderRight: `1px solid ${colors.neutralStroke}`,
                    textAlign: 'left',
                    lineHeight: '1.3',
                    flex: '0 0 54%'
                  }}>
                    • 2 Tickets<br/>
                    • 1 bottle of wine<br/>
                    • Reserved seating at a sponsor table<br/>
                    • Media acknowledgement
                  </div>
                </div>
              </div>

              {/* Right: QR Code Section - WHITE BACKGROUND */}
              <div style={{ 
                flex: '1',
                backgroundColor: colors.white,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px 12px',
                borderBottom: `1px solid ${colors.neutralStroke}`
              }}>
                <div style={{
                  color: colors.navy,
                  fontWeight: '600',
                  fontSize: '11px',
                  marginBottom: '12px',
                  fontFamily: 'Georgia, serif',
                  textAlign: 'center',
                  lineHeight: '1.3'
                }}>
                  Submit form and pay<br/>online by scanning code
                </div>
                
                <QRCodeDisplay 
                  url="https://affairtoremember.ukiahseniorcenter.org/table-sponsors"
                  title=""
                  description=""
                  size={100}
                />
              </div>
            </div>
          </div>

          {/* Tickets and Donations */}
          <div className="space-y-2 mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm">#</span>
              <div className="border-b border-black w-14 h-4"></div>
              <span className="text-sm">Single Tickets @ $100.00 (Card: $104) each; after 3/28/26 $110.00 (Card: $114) each</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm">Enclosed is my monetary donation in the amount of $</span>
              <div className="border-b border-black w-20 h-4"></div>
            </div>
          </div>

          {/* Contact Information Table */}
          <div className="mb-3">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="pb-2 pr-4 w-1/2">
                    <span className="text-sm">Name:</span>
                    <div className="border-b border-black w-full h-4 mt-1"></div>
                  </td>
                  <td className="pb-2 w-1/2">
                    <span className="text-sm">Address:</span>
                    <div className="border-b border-black w-full h-4 mt-1"></div>
                  </td>
                </tr>
                <tr>
                  <td className="pr-4 w-1/2">
                    <span className="text-sm">Phone:</span>
                    <div className="border-b border-black w-full h-4 mt-1"></div>
                  </td>
                  <td className="w-1/2">
                    <span className="text-sm">Email:</span>
                    <div className="border-b border-black w-full h-4 mt-1"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment Information */}
          <div className="space-y-2 border-t border-gray-300 pt-3">
            <div>
              <p className="text-sm font-semibold mb-2">CREDIT CARD: Your credit card information will not be retained after transaction</p>
              <table className="w-full mb-2">
                <tbody>
                  <tr>
                    <td className="pr-2 w-1/2">
                      <span className="text-sm">CC#:</span>
                      <div className="border-b border-black w-full h-4 mt-1"></div>
                    </td>
                    <td className="pr-2 w-1/4">
                      <span className="text-sm">Exp:</span>
                      <div className="border-b border-black w-full h-4 mt-1"></div>
                    </td>
                    <td className="w-1/4">
                      <span className="text-sm">CVC:</span>
                      <div className="border-b border-black w-full h-4 mt-1"></div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="pr-4 w-1/2">
                      <span className="text-sm">Name on card:</span>
                      <div className="border-b border-black w-full h-4 mt-1"></div>
                    </td>
                    <td className="w-1/2">
                      <span className="text-sm">Zip:</span>
                      <div className="border-b border-black w-full h-4 mt-1"></div>
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
          <div className="pt-2">
            <p className="text-sm font-semibold mb-2">Ticket Delivery Options:</p>
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

          {/* Contact Information Table */}
          <div className="mb-3">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="pb-2 pr-4 w-1/2">
                    <span className="text-sm">Name:</span>
                    <div className="border-b border-black w-full h-4 mt-1"></div>
                  </td>
                  <td className="pb-2 w-1/2">
                    <span className="text-sm">Address:</span>
                    <div className="border-b border-black w-full h-4 mt-1"></div>
                  </td>
                </tr>
                <tr>
                  <td className="pr-4 w-1/2">
                    <span className="text-sm">Phone:</span>
                    <div className="border-b border-black w-full h-4 mt-1"></div>
                  </td>
                  <td className="w-1/2">
                    <span className="text-sm">Email:</span>
                    <div className="border-b border-black w-full h-4 mt-1"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment Information */}
          <div className="space-y-2 border-t border-gray-300 pt-2">
            <div>
              <p className="text-sm font-semibold mb-2">CREDIT CARD: Your credit card information will not be retained after transaction</p>
              <table className="w-full mb-2">
                <tbody>
                  <tr>
                    <td className="pr-2 w-1/2">
                      <span className="text-sm">CC#:</span>
                      <div className="border-b border-black w-full h-4 mt-1"></div>
                    </td>
                    <td className="pr-2 w-1/4">
                      <span className="text-sm">Exp:</span>
                      <div className="border-b border-black w-full h-4 mt-1"></div>
                    </td>
                    <td className="w-1/4">
                      <span className="text-sm">CVC:</span>
                      <div className="border-b border-black w-full h-4 mt-1"></div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="pr-4 w-1/2">
                      <span className="text-sm">Name on card:</span>
                      <div className="border-b border-black w-full h-4 mt-1"></div>
                    </td>
                    <td className="w-1/2">
                      <span className="text-sm">Zip:</span>
                      <div className="border-b border-black w-full h-4 mt-1"></div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 p-2 rounded">
              <p className="text-sm font-semibold mb-1">CHECK:</p>
              <p className="text-sm leading-tight">
                Please make checks payable to Ukiah Senior Center and write &ldquo;AATR&rdquo; in the memo.<br/>
                Mail this form with payment to: Ukiah Senior Center, Attn: AATR, 499 Leslie St., Ukiah, CA 95482
              </p>
            </div>
          </div>

          {/* Ticket Delivery Options */}
          <div className="pt-2">
            <p className="text-sm font-semibold mb-2">Ticket Delivery Options:</p>
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
        <div className="text-center border-t border-gray-300 pt-2 mt-3">
          <p className="text-xs font-semibold text-gray-700" style={{ letterSpacing: '0.3px', fontSize: '10px' }}>
            UKIAH SENIOR CENTER ⟡ 499 LESLIE ST, UKIAH, CA 95482 ⟡ (707) 462-4343 ⟡ UKIAHSENIORCENTER.ORG
          </p>
        </div>

        {/* Download PDF button */}
        <div className="fixed top-4 right-4 print:hidden">
          <button
            onClick={handleDownloadPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-lg text-sm font-medium transition-colors"
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* Print-specific styles */}
      <style jsx>{`
        @media print {
          body { margin: 0; }
          .print\\:px-4 { padding-left: 16px; padding-right: 16px; }
          .print\\:py-2 { padding-top: 8px; padding-bottom: 8px; }
          .print\\:hidden { display: none; }
          .max-w-\\[8\\.5in\\] { max-width: 8.5in; width: 8.5in; }
          
          /* Ensure proper page breaks */
          .page-break-avoid { page-break-inside: avoid; }
          .page-break-before { page-break-before: always; }
          
          /* Font sizes for print */
          .text-xs { font-size: 10px; }
          .text-sm { font-size: 11px; }
          
          /* Ensure borders print */
          * { -webkit-print-color-adjust: exact; color-adjust: exact; }
        }
      `}</style>
    </div>
  )
}