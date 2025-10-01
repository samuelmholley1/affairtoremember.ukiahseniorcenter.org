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
      <div className="max-w-[8.5in] mx-auto px-6 py-4 print:px-4 print:py-3">

        {/* Header */}
        <div className="text-center mb-4">
          <h1 style={{
            color: colors.navy,
            fontWeight: '700',
            fontSize: '20px',
            marginBottom: '8px',
            fontFamily: 'Georgia, serif'
          }}>
            Support the Ukiah Senior Center
          </h1>
          <p style={{
            color: colors.black,
            fontSize: '14px',
            marginBottom: '12px'
          }}>
            Purchase Tickets and/or Become a Sponsor for &apos;An Affair to Remember&apos; on Saturday, April 11, 2026
          </p>
        </div>

        {/* Side-by-side layout: Form left, QR code right */}
        <div className="mb-4" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          
          {/* Left side: Form content */}
          <div style={{ flex: '3' }}>
            
            {/* Sponsorship Levels Section */}
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{
                color: colors.navy,
                fontWeight: '700',
                fontSize: '16px',
                marginBottom: '8px',
                fontFamily: 'Georgia, serif'
              }}>
                ☐ Sponsorship Levels (Check One)
              </h2>
              
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                border: `1px solid ${colors.neutralStroke}`,
                fontFamily: 'Georgia, serif',
                fontSize: '10px',
                marginBottom: '12px'
              }}>
                <thead>
                  <tr style={{ backgroundColor: colors.lightGray }}>
                    <th style={{
                      color: colors.navy,
                      fontWeight: '600',
                      fontSize: '10px',
                      padding: '4px 6px',
                      textAlign: 'center',
                      border: `1px solid ${colors.neutralStroke}`,
                      width: '8%'
                    }}>Select</th>
                    <th style={{
                      color: colors.navy,
                      fontWeight: '600',
                      fontSize: '10px',
                      padding: '4px 6px',
                      textAlign: 'center',
                      border: `1px solid ${colors.neutralStroke}`,
                      width: '22%'
                    }}>Tier</th>
                    <th style={{
                      color: colors.navy,
                      fontWeight: '600',
                      fontSize: '10px',
                      padding: '4px 6px',
                      textAlign: 'center',
                      border: `1px solid ${colors.neutralStroke}`,
                      width: '15%'
                    }}>Price</th>
                    <th style={{
                      color: colors.navy,
                      fontWeight: '600',
                      fontSize: '10px',
                      padding: '4px 6px',
                      textAlign: 'center',
                      border: `1px solid ${colors.neutralStroke}`,
                      width: '55%'
                    }}>Benefits</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{
                      textAlign: 'center',
                      padding: '6px',
                      border: `1px solid ${colors.neutralStroke}`,
                      fontSize: '16px'
                    }}>☐</td>
                    <td style={{
                      color: colors.burgundy,
                      fontWeight: '600',
                      fontSize: '10px',
                      padding: '4px 6px',
                      border: `1px solid ${colors.neutralStroke}`,
                      textAlign: 'center'
                    }}>Diamond</td>
                    <td style={{
                      color: colors.burgundy,
                      fontWeight: '600',
                      fontSize: '10px',
                      padding: '4px 6px',
                      border: `1px solid ${colors.neutralStroke}`,
                      textAlign: 'center'
                    }}>$2,500</td>
                    <td style={{
                      fontSize: '9px',
                      padding: '4px 6px',
                      border: `1px solid ${colors.neutralStroke}`
                    }}>• 2 Reserved Tables for 8 • 4 bottles of wine • Recognition on advertising • Banner at event • Media acknowledgement</td>
                  </tr>
                  <tr>
                    <td style={{
                      textAlign: 'center',
                      padding: '6px',
                      border: `1px solid ${colors.neutralStroke}`,
                      fontSize: '16px'
                    }}>☐</td>
                    <td style={{
                      color: colors.navy,
                      fontWeight: '600',
                      fontSize: '10px',
                      padding: '4px 6px',
                      border: `1px solid ${colors.neutralStroke}`,
                      textAlign: 'center'
                    }}>Platinum</td>
                    <td style={{
                      color: colors.navy,
                      fontWeight: '600',
                      fontSize: '10px',
                      padding: '4px 6px',
                      border: `1px solid ${colors.neutralStroke}`,
                      textAlign: 'center'
                    }}>$1,500</td>
                    <td style={{
                      fontSize: '9px',
                      padding: '4px 6px',
                      border: `1px solid ${colors.neutralStroke}`
                    }}>• 1 Reserved table for 8 • 2 bottles of wine • Recognition on advertising • Banner at event • Media acknowledgement</td>
                  </tr>
                  <tr>
                    <td style={{
                      textAlign: 'center',
                      padding: '6px',
                      border: `1px solid ${colors.neutralStroke}`,
                      fontSize: '16px'
                    }}>☐</td>
                    <td style={{
                      color: colors.burgundy,
                      fontWeight: '600',
                      fontSize: '10px',
                      padding: '4px 6px',
                      border: `1px solid ${colors.neutralStroke}`,
                      textAlign: 'center'
                    }}>Gold</td>
                    <td style={{
                      color: colors.burgundy,
                      fontWeight: '600',
                      fontSize: '10px',
                      padding: '4px 6px',
                      border: `1px solid ${colors.neutralStroke}`,
                      textAlign: 'center'
                    }}>$750</td>
                    <td style={{
                      fontSize: '9px',
                      padding: '4px 6px',
                      border: `1px solid ${colors.neutralStroke}`
                    }}>• 4 Tickets • 1 bottle of wine • Reserved seating • Media acknowledgement</td>
                  </tr>
                  <tr>
                    <td style={{
                      textAlign: 'center',
                      padding: '6px',
                      border: `1px solid ${colors.neutralStroke}`,
                      fontSize: '16px'
                    }}>☐</td>
                    <td style={{
                      color: colors.navy,
                      fontWeight: '600',
                      fontSize: '10px',
                      padding: '4px 6px',
                      border: `1px solid ${colors.neutralStroke}`,
                      textAlign: 'center'
                    }}>Ruby</td>
                    <td style={{
                      color: colors.navy,
                      fontWeight: '600',
                      fontSize: '10px',
                      padding: '4px 6px',
                      border: `1px solid ${colors.neutralStroke}`,
                      textAlign: 'center'
                    }}>$400</td>
                    <td style={{
                      fontSize: '9px',
                      padding: '4px 6px',
                      border: `1px solid ${colors.neutralStroke}`
                    }}>• 2 Tickets • 1 bottle of wine • Reserved seating • Media acknowledgement</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Individual Tickets and Donations */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  color: colors.navy,
                  fontWeight: '600',
                  fontSize: '12px',
                  marginBottom: '6px'
                }}>Individual Tickets</h3>
                <p style={{ fontSize: '10px', marginBottom: '4px' }}>
                  # of Tickets: _____ @ $100 each (after 3/28/26: $110 each)
                </p>
                <p style={{ fontSize: '10px' }}>
                  Subtotal: $ __________
                </p>
              </div>
              
              <div style={{ flex: 1 }}>
                <h3 style={{
                  color: colors.navy,
                  fontWeight: '600',
                  fontSize: '12px',
                  marginBottom: '6px'
                }}>Donations</h3>
                <p style={{ fontSize: '10px', marginBottom: '4px' }}>
                  Monetary donation: $ __________
                </p>
                <p style={{ fontSize: '10px' }}>
                  Silent auction item: _______________
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{
                color: colors.navy,
                fontWeight: '600',
                fontSize: '12px',
                marginBottom: '8px'
              }}>Contact Information</h3>
              
              <div style={{ display: 'flex', gap: '12px', marginBottom: '6px' }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '10px' }}>Name: </span>
                  <div style={{ borderBottom: '1px solid #000', height: '16px' }}></div>
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '10px' }}>Email: </span>
                  <div style={{ borderBottom: '1px solid #000', height: '16px' }}></div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', marginBottom: '6px' }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '10px' }}>Phone: </span>
                  <div style={{ borderBottom: '1px solid #000', height: '16px' }}></div>
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '10px' }}>Address: </span>
                  <div style={{ borderBottom: '1px solid #000', height: '16px' }}></div>
                </div>
              </div>
            </div>

            {/* Payment and Delivery */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  color: colors.navy,
                  fontWeight: '600',
                  fontSize: '12px',
                  marginBottom: '6px'
                }}>Payment Method</h3>
                <p style={{ fontSize: '10px', marginBottom: '2px' }}>☐ Check (payable to Ukiah Senior Center)</p>
                <p style={{ fontSize: '10px' }}>☐ Credit Card (complete online)</p>
              </div>
              
              <div style={{ flex: 1 }}>
                <h3 style={{
                  color: colors.navy,
                  fontWeight: '600',
                  fontSize: '12px',
                  marginBottom: '6px'
                }}>Ticket Delivery</h3>
                <p style={{ fontSize: '10px', marginBottom: '2px' }}>☐ Pick up at USC</p>
                <p style={{ fontSize: '10px' }}>☐ Hold at Will Call</p>
              </div>
            </div>

            {/* Total */}
            <div style={{
              borderTop: `2px solid ${colors.navy}`,
              paddingTop: '8px',
              marginBottom: '12px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: colors.navy
                }}>TOTAL AMOUNT:</span>
                <span style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: colors.navy
                }}>$ ____________</span>
              </div>
            </div>
          </div>

          {/* Right side: QR Code */}
          <div style={{ flex: '1', textAlign: 'center', minWidth: '120px' }}>
            <h3 style={{
              color: colors.navy,
              fontWeight: '700',
              fontSize: '12px',
              marginBottom: '8px',
              fontFamily: 'Georgia, serif'
            }}>
              Complete Online
            </h3>
            
            <div style={{
              backgroundColor: colors.white,
              padding: '8px',
              textAlign: 'center'
            }}>
              <QRCodeDisplay 
                url={sponsorshipUrl}
                title=""
                description=""
                size={80}
              />
              <p style={{
                fontSize: '9px',
                color: colors.black,
                marginTop: '4px'
              }}>
                Scan to complete form online
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div style={{
          backgroundColor: colors.lightGray,
          padding: '8px',
          marginBottom: '12px',
          fontSize: '10px',
          borderRadius: '4px'
        }}>
          <p style={{ marginBottom: '4px', fontWeight: '600' }}>Check Payment Instructions:</p>
          <p>Make checks payable to <strong>Ukiah Senior Center</strong> and write <strong>&quot;AATR&quot;</strong> in the memo. Mail to: Ukiah Senior Center, Attn: AATR, 499 Leslie St., Ukiah, CA 95482</p>
        </div>

        {/* Tax Information */}
        <div style={{
          textAlign: 'center',
          fontFamily: 'Georgia, serif',
          marginBottom: '12px'
        }}>
          <p style={{ color: colors.black, fontSize: '10px', marginBottom: '4px' }}>
            Your donation is tax deductible. Ukiah Senior Center is a 501(c)3 charitable organization.
          </p>
          <p style={{ color: colors.navy, fontSize: '10px', fontWeight: '700', marginBottom: '8px' }}>
            Tax ID #: 23-7258082
          </p>
          
          <div style={{ marginTop: '8px', textAlign: 'center' }}>
            <p style={{ color: colors.black, fontSize: '10px', marginBottom: '2px' }}>
              Sincerely,
            </p>
            <p style={{ color: colors.navy, fontSize: '10px', fontWeight: '600', marginBottom: '1px' }}>
              Clara Lehman
            </p>
            <p style={{ color: colors.black, fontSize: '9px' }}>
              Vice President, USC BOARD OF DIRECTORS
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          borderTop: `1px solid ${colors.neutralStroke}`,
          paddingTop: '6px',
          fontFamily: 'Georgia, serif'
        }}>
          <p style={{ 
            color: colors.navy, 
            fontSize: '9px', 
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
            font-size: 9pt;
            line-height: 1.2;
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