'use client'

import QRCodeDisplay from '../../components/QRCodeDisplay'

export default function PaperTableSponsorshipsPage() {
  // Get the base URL for the QR codes (will be the production URL)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://affairtoremember.ukiahseniorcenter.org'
  
  const sponsorshipUrl = `${baseUrl}/table-sponsors`

  // Brand colors (HEX only) - Subtle palette
  const colors = {
    navy: '#042148',
    burgundy: '#9F3833',
    black: '#000000',
    white: '#FFFFFF',
    neutralStroke: '#E5E7EB',
    lightGray: '#F9FAFB'
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
          filename: 'table-sponsorships.pdf'
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
      a.download = 'table-sponsorships.pdf';
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
      <div className="max-w-[8.5in] mx-auto px-8 py-6 print:px-6 print:py-4">

        {/* Letter Content */}
        <div className="mb-6 leading-relaxed" style={{ 
          fontFamily: 'Georgia, serif',
          color: colors.black,
          fontSize: '14px',
          lineHeight: '1.5',
          marginTop: '16px'
        }}>
          <p className="mb-4">Dear Community Partner,</p>
          
          <p className="mb-4">
            Ukiah Senior Center is celebrating more than 50 years of serving the greater Ukiah community. In an effort to remain a viable resource, we are gearing up for a Major Fundraising Gala. <strong style={{ color: colors.navy, fontWeight: '700' }}>Please consider adding this Gala to your philanthropic budget for 2026.</strong>
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
          
          <p className="mb-5">
            To become a sponsor for this important fundraising event, please complete the information below and return to Ukiah Senior Center, 499 Leslie St, Ukiah CA or use the QR code provided:
          </p>
        </div>

        {/* Side-by-side layout: Table left, QR code right */}
        <div className="mb-6 side-by-side-layout" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          
          {/* Left side: Sponsorship Table */}
          <div className="table-section" style={{ flex: '2', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{
              color: colors.navy,
              fontWeight: '700',
              fontSize: '18px',
              marginBottom: '12px',
              fontFamily: 'Georgia, serif',
              textAlign: 'center'
            }}>
              Table Sponsorship Opportunities
            </h2>
            
            <table style={{
              width: '90%',
              borderCollapse: 'collapse',
              border: `1px solid ${colors.neutralStroke}`,
              fontFamily: 'Georgia, serif',
              pageBreakInside: 'avoid',
              margin: '0 auto'
            }}>
              <thead>
                <tr style={{
                  backgroundColor: colors.lightGray,
                  pageBreakInside: 'avoid'
                }}>
                  <th style={{
                    color: colors.navy,
                    fontWeight: '600',
                    fontSize: '12px',
                    padding: '8px 12px',
                    textAlign: 'center',
                    border: `1px solid ${colors.neutralStroke}`,
                    width: '25%',
                    whiteSpace: 'nowrap'
                  }}>
                    Sponsorship Tier
                  </th>
                  <th style={{
                    color: colors.navy,
                    fontWeight: '600',
                    fontSize: '12px',
                    padding: '8px 12px',
                    textAlign: 'center',
                    border: `1px solid ${colors.neutralStroke}`,
                    width: '20%',
                    whiteSpace: 'nowrap'
                  }}>
                    Investment
                  </th>
                  <th style={{
                    color: colors.navy,
                    fontWeight: '600',
                    fontSize: '12px',
                    padding: '8px 12px',
                    textAlign: 'center',
                    border: `1px solid ${colors.neutralStroke}`,
                    width: '55%'
                  }}>
                    Benefits
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ pageBreakInside: 'avoid', borderTop: `3px solid ${colors.neutralStroke}` }}>
                  <td style={{
                    color: colors.burgundy,
                    fontWeight: '600',
                    fontSize: '12px',
                    padding: '6px 12px',
                    borderTop: `1px solid ${colors.neutralStroke}`,
                    whiteSpace: 'nowrap',
                    textAlign: 'center'
                  }}>
                    Diamond
                  </td>
                  <td style={{
                    color: colors.burgundy,
                    fontWeight: '600',
                    fontSize: '12px',
                    padding: '6px 12px',
                    textAlign: 'center',
                    borderTop: `1px solid ${colors.neutralStroke}`,
                    whiteSpace: 'nowrap'
                  }}>
                    $5,000
                  </td>
                  <td style={{
                    color: colors.black,
                    fontWeight: '400',
                    fontSize: '11px',
                    padding: '6px 12px 6px 35px',
                    borderTop: `1px solid ${colors.neutralStroke}`,
                    textAlign: 'left'
                  }}>
                    • Premium table placement<br/>
                    • Logo on all materials<br/>
                    • Special recognition<br/>
                    • Complimentary wine service
                  </td>
                </tr>
                <tr style={{ pageBreakInside: 'avoid', borderTop: `3px solid ${colors.neutralStroke}` }}>
                  <td style={{
                    color: colors.navy,
                    fontWeight: '600',
                    fontSize: '12px',
                    padding: '6px 12px',
                    borderTop: `1px solid ${colors.neutralStroke}`,
                    whiteSpace: 'nowrap',
                    textAlign: 'center'
                  }}>
                    Platinum
                  </td>
                  <td style={{
                    color: colors.navy,
                    fontWeight: '600',
                    fontSize: '12px',
                    padding: '6px 12px',
                    textAlign: 'center',
                    borderTop: `1px solid ${colors.neutralStroke}`,
                    whiteSpace: 'nowrap'
                  }}>
                    $2,500
                  </td>
                  <td style={{
                    color: colors.black,
                    fontWeight: '400',
                    fontSize: '11px',
                    padding: '6px 12px 6px 35px',
                    borderTop: `1px solid ${colors.neutralStroke}`,
                    textAlign: 'left'
                  }}>
                    • Preferred table placement<br/>
                    • Logo on select materials<br/>
                    • Acknowledgment<br/>
                    • Wine service
                  </td>
                </tr>
                <tr style={{ pageBreakInside: 'avoid', borderTop: `3px solid ${colors.neutralStroke}` }}>
                  <td style={{
                    color: colors.burgundy,
                    fontWeight: '600',
                    fontSize: '12px',
                    padding: '6px 12px',
                    borderTop: `1px solid ${colors.neutralStroke}`,
                    whiteSpace: 'nowrap',
                    textAlign: 'center'
                  }}>
                    Gold
                  </td>
                  <td style={{
                    color: colors.burgundy,
                    fontWeight: '600',
                    fontSize: '12px',
                    padding: '6px 12px',
                    textAlign: 'center',
                    borderTop: `1px solid ${colors.neutralStroke}`,
                    whiteSpace: 'nowrap'
                  }}>
                    $1,000
                  </td>
                  <td style={{
                    color: colors.black,
                    fontWeight: '400',
                    fontSize: '11px',
                    padding: '6px 12px 6px 35px',
                    borderTop: `1px solid ${colors.neutralStroke}`,
                    textAlign: 'left'
                  }}>
                    • Reserved table seating<br/>
                    • Program acknowledgment<br/>
                    • Wine service
                  </td>
                </tr>
                <tr style={{ pageBreakInside: 'avoid', borderTop: `3px solid ${colors.neutralStroke}` }}>
                  <td style={{
                    color: colors.navy,
                    fontWeight: '600',
                    fontSize: '12px',
                    padding: '6px 12px',
                    borderTop: `1px solid ${colors.neutralStroke}`,
                    whiteSpace: 'nowrap',
                    textAlign: 'center'
                  }}>
                    Ruby
                  </td>
                  <td style={{
                    color: colors.navy,
                    fontWeight: '600',
                    fontSize: '12px',
                    padding: '6px 12px',
                    textAlign: 'center',
                    borderTop: `1px solid ${colors.neutralStroke}`,
                    whiteSpace: 'nowrap'
                  }}>
                    $1,500
                  </td>
                  <td style={{
                    color: colors.black,
                    fontWeight: '400',
                    fontSize: '11px',
                    padding: '6px 12px 6px 35px',
                    borderTop: `1px solid ${colors.neutralStroke}`,
                    textAlign: 'left'
                  }}>
                    • Table for 8 guests<br/>
                    • Program listing<br/>
                    • Complimentary appetizers
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Right side: QR Code */}
          <div className="qr-section" style={{ flex: '1', minWidth: '200px', textAlign: 'center' }}>
            <h3 style={{
              color: colors.navy,
              fontWeight: '700',
              fontSize: '16px',
              marginBottom: '16px',
              fontFamily: 'Georgia, serif'
            }}>
              Quick Access
            </h3>
            
            <div 
              className="qr-card"
              style={{
                backgroundColor: colors.white,
                padding: '16px',
                textAlign: 'center',
                pageBreakInside: 'avoid',
                breakInside: 'avoid'
              }}
              aria-label="QR code for table sponsorship form"
            >
              <QRCodeDisplay 
                url={sponsorshipUrl}
                title="Table Sponsors"
                description="Scan to sponsor a table"
                size={100}
              />
            </div>
          </div>
        </div>

        {/* Signature Section */}
        <div className="mb-6" style={{ marginTop: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ color: colors.black, fontSize: '14px', marginBottom: '8px' }}>
              Please complete the following information:
            </p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '24px' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '12px', marginBottom: '4px' }}>Sponsor Name/Organization:</p>
                <div style={{ borderBottom: '1px solid #000', height: '20px', width: '100%' }}></div>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '12px', marginBottom: '4px' }}>Contact Person:</p>
                <div style={{ borderBottom: '1px solid #000', height: '20px', width: '100%' }}></div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '24px' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '12px', marginBottom: '4px' }}>Phone:</p>
                <div style={{ borderBottom: '1px solid #000', height: '20px', width: '100%' }}></div>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '12px', marginBottom: '4px' }}>Email:</p>
                <div style={{ borderBottom: '1px solid #000', height: '20px', width: '100%' }}></div>
              </div>
            </div>
            
            <div>
              <p style={{ fontSize: '12px', marginBottom: '4px' }}>Mailing Address:</p>
              <div style={{ borderBottom: '1px solid #000', height: '20px', width: '100%', marginBottom: '8px' }}></div>
              <div style={{ borderBottom: '1px solid #000', height: '20px', width: '100%' }}></div>
            </div>
            
            <div>
              <p style={{ fontSize: '12px', marginBottom: '4px' }}>Preferred Sponsorship Level:</p>
              <div style={{ borderBottom: '1px solid #000', height: '20px', width: '100%' }}></div>
            </div>
          </div>
        </div>

        {/* Tax Information */}
        <div style={{
          textAlign: 'center',
          fontFamily: 'Georgia, serif',
          marginTop: '24px'
        }}>
          <p style={{ color: colors.black, fontSize: '12px', marginBottom: '4px' }}>
            Your donation is tax deductible. Ukiah Senior Center is a 501(c)3 charitable organization.
          </p>
          <p style={{ color: colors.navy, fontSize: '12px', fontWeight: '700', marginBottom: '12px' }}>
            Tax ID #: 23-7258082
          </p>
          
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <p style={{ color: colors.black, fontSize: '12px', marginBottom: '2px' }}>
              Sincerely,
            </p>
            <p style={{ color: colors.navy, fontSize: '12px', fontWeight: '600', marginBottom: '1px' }}>
              Clara Lehman
            </p>
            <p style={{ color: colors.black, fontSize: '11px' }}>
              Vice President, USC BOARD OF DIRECTORS
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          borderTop: `1px solid ${colors.neutralStroke}`,
          paddingTop: '8px',
          marginTop: '24px',
          fontFamily: 'Georgia, serif'
        }}>
          <p style={{ 
            color: colors.navy, 
            fontSize: '11px', 
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}>
            UKIAH SENIOR CENTER - 499 LESLIE ST, UKIAH, CA 95482 - (707) 462-4343 - UKIAHSENIORCENTER.ORG
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
            margin: 0.5in;
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
            font-size: 11pt;
            line-height: 1.3;
            margin: 0;
            padding: 0;
          }
          
          .fixed {
            display: none !important;
          }
          
          .qr-card {
            box-shadow: none !important;
          }
          
          .mb-6 {
            margin-bottom: 12px !important;
          }
          
          .mb-4 {
            margin-bottom: 8px !important;
          }
          
          .mb-5 {
            margin-bottom: 10px !important;
          }
        }
        
        /* Responsive layout for mobile */
        @media screen and (max-width: 768px) {
          .side-by-side-layout {
            flex-direction: column !important;
            gap: 16px !important;
          }
          
          .table-section {
            flex: none !important;
          }
          
          .qr-section {
            flex: none !important;
            min-width: auto !important;
          }
        }
      `}</style>
    </div>
  )
}