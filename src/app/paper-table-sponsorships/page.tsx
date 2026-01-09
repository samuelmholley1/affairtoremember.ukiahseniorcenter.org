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
    lightGray: '#F9FAFB',
    gray: '#6B7280'
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
    <div className="bg-white min-h-screen" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Print-optimized letter layout */}
      <div className="max-w-[8.5in] mx-auto px-3 py-2 print:px-2 print:py-1">

        {/* Header */}
        <div className="text-center mb-2">
          <h1 style={{
            color: colors.navy,
            fontWeight: '700',
            fontSize: '22px',
            marginBottom: '4px',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            Support the Ukiah Senior Center
          </h1>
          <p style={{
            color: colors.black,
            fontSize: '14px',
            marginBottom: '6px',
            lineHeight: '1.3',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            An Affair to Remember • Saturday, April 11, 2026
          </p>
        </div>

        {/* Sponsorship Levels Section - Full Width */}
        <div style={{ marginBottom: '8px' }}>
          <h2 style={{
            color: colors.navy,
            fontWeight: '700',
            fontSize: '16px',
            marginBottom: '4px',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            ☐ Sponsorship Levels
          </h2>
          
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            border: `1.5px solid ${colors.navy}`,
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '13px',
            marginBottom: '6px'
          }}>
            <thead>
              <tr style={{ backgroundColor: colors.lightGray }}>
                <th style={{
                  color: colors.navy,
                  fontWeight: '700',
                  fontSize: '13px',
                  padding: '5px 6px',
                  textAlign: 'center',
                  border: `1px solid ${colors.navy}`,
                  width: '6%'
                }}>☐</th>
                <th style={{
                  color: colors.navy,
                  fontWeight: '700',
                  fontSize: '13px',
                  padding: '5px 6px',
                  textAlign: 'center',
                  border: `1px solid ${colors.navy}`,
                  width: '20%'
                }}>Tier</th>
                <th style={{
                  color: colors.navy,
                  fontWeight: '700',
                  fontSize: '13px',
                  padding: '5px 6px',
                  textAlign: 'center',
                  border: `1px solid ${colors.navy}`,
                  width: '16%'
                }}>Price</th>
                <th style={{
                  color: colors.navy,
                  fontWeight: '700',
                  fontSize: '13px',
                  padding: '5px 6px',
                  textAlign: 'left',
                  border: `1px solid ${colors.navy}`,
                  width: '58%'
                }}>Benefits</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{
                  textAlign: 'center',
                  padding: '4px',
                  border: `1px solid ${colors.neutralStroke}`,
                  fontSize: '16px',
                  fontWeight: '600'
                }}></td>
                <td style={{
                  color: colors.burgundy,
                  fontWeight: '700',
                  fontSize: '13px',
                  padding: '4px 5px',
                  border: `1px solid ${colors.neutralStroke}`,
                  textAlign: 'center'
                }}>Diamond</td>
                <td style={{
                  color: colors.burgundy,
                  fontWeight: '700',
                  fontSize: '13px',
                  padding: '4px 5px',
                  border: `1px solid ${colors.neutralStroke}`,
                  textAlign: 'center'
                }}>$2,500</td>
                <td style={{
                  fontSize: '12px',
                  padding: '4px 5px',
                  border: `1px solid ${colors.neutralStroke}`,
                  lineHeight: '1.4'
                }}>2 Reserved Tables (16 seats) • 4 bottles of wine • Recognition • Banner • Media</td>
              </tr>
              <tr>
                <td style={{
                  textAlign: 'center',
                  padding: '4px',
                  border: `1px solid ${colors.neutralStroke}`,
                  fontSize: '16px',
                  fontWeight: '600'
                }}></td>
                <td style={{
                  color: colors.navy,
                  fontWeight: '700',
                  fontSize: '13px',
                  padding: '4px 5px',
                  border: `1px solid ${colors.neutralStroke}`,
                  textAlign: 'center'
                }}>Platinum</td>
                <td style={{
                  color: colors.navy,
                  fontWeight: '700',
                  fontSize: '13px',
                  padding: '4px 5px',
                  border: `1px solid ${colors.neutralStroke}`,
                  textAlign: 'center'
                }}>$1,500</td>
                <td style={{
                  fontSize: '12px',
                  padding: '4px 5px',
                  border: `1px solid ${colors.neutralStroke}`,
                  lineHeight: '1.4'
                }}>1 Reserved Table (8 seats) • 2 bottles of wine • Recognition • Banner • Media</td>
              </tr>
              <tr>
                <td style={{
                  textAlign: 'center',
                  padding: '4px',
                  border: `1px solid ${colors.neutralStroke}`,
                  fontSize: '16px',
                  fontWeight: '600'
                }}></td>
                <td style={{
                  color: colors.burgundy,
                  fontWeight: '700',
                  fontSize: '13px',
                  padding: '4px 5px',
                  border: `1px solid ${colors.neutralStroke}`,
                  textAlign: 'center'
                }}>Gold</td>
                <td style={{
                  color: colors.burgundy,
                  fontWeight: '700',
                  fontSize: '13px',
                  padding: '4px 5px',
                  border: `1px solid ${colors.neutralStroke}`,
                  textAlign: 'center'
                }}>$750</td>
                <td style={{
                  fontSize: '12px',
                  padding: '4px 5px',
                  border: `1px solid ${colors.neutralStroke}`,
                  lineHeight: '1.4'
                }}>4 Tickets • 1 bottle of wine • Reserved seating • Media acknowledgement</td>
              </tr>
              <tr>
                <td style={{
                  textAlign: 'center',
                  padding: '4px',
                  border: `1px solid ${colors.neutralStroke}`,
                  fontSize: '16px',
                  fontWeight: '600'
                }}></td>
                <td style={{
                  color: colors.navy,
                  fontWeight: '700',
                  fontSize: '13px',
                  padding: '4px 5px',
                  border: `1px solid ${colors.neutralStroke}`,
                  textAlign: 'center'
                }}>Ruby</td>
                <td style={{
                  color: colors.navy,
                  fontWeight: '700',
                  fontSize: '13px',
                  padding: '4px 5px',
                  border: `1px solid ${colors.neutralStroke}`,
                  textAlign: 'center'
                }}>$400</td>
                <td style={{
                  fontSize: '12px',
                  padding: '4px 5px',
                  border: `1px solid ${colors.neutralStroke}`,
                  lineHeight: '1.4'
                }}>2 Tickets • 1 bottle of wine • Reserved seating • Media acknowledgement</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Tickets, Donations, Contact, Payment Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
          {/* Left Column */}
          <div>
            {/* Individual Tickets */}
            <div style={{ marginBottom: '6px' }}>
              <h3 style={{
                color: colors.navy,
                fontWeight: '700',
                fontSize: '13px',
                marginBottom: '2px'
              }}>Individual Tickets</h3>
              <p style={{ fontSize: '12px', margin: '0 0 2px 0' }}>
                # of Tickets: _____ @ $100
              </p>
              <p style={{ fontSize: '11px', margin: '0', color: colors.gray }}>
                (After 3/28/26: $110)
              </p>
            </div>

            {/* Donations */}
            <div style={{ marginBottom: '6px' }}>
              <h3 style={{
                color: colors.navy,
                fontWeight: '700',
                fontSize: '13px',
                marginBottom: '2px'
              }}>Donations</h3>
              <p style={{ fontSize: '12px', margin: '0 0 2px 0' }}>
                Monetary: $ _______
              </p>
              <p style={{ fontSize: '12px', margin: '0' }}>
                Auction Item: __________
              </p>
            </div>

            {/* Payment Method */}
            <div>
              <h3 style={{
                color: colors.navy,
                fontWeight: '700',
                fontSize: '13px',
                marginBottom: '3px'
              }}>Payment Method</h3>
              <p style={{ fontSize: '12px', marginBottom: '2px', margin: '0 0 2px 0' }}>☐ Check (payable to Ukiah Senior Center)</p>
              <p style={{ fontSize: '12px', margin: '0' }}>☐ Credit Card (complete online)</p>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Contact Information */}
            <div style={{ marginBottom: '6px' }}>
              <h3 style={{
                color: colors.navy,
                fontWeight: '700',
                fontSize: '13px',
                marginBottom: '3px'
              }}>Contact Information</h3>
              
              <div style={{ marginBottom: '3px' }}>
                <span style={{ fontSize: '11px', fontWeight: '600' }}>Name: </span>
                <div style={{ borderBottom: '1px solid #000', height: '14px' }}></div>
              </div>
              
              <div style={{ marginBottom: '3px' }}>
                <span style={{ fontSize: '11px', fontWeight: '600' }}>Email: </span>
                <div style={{ borderBottom: '1px solid #000', height: '14px' }}></div>
              </div>
              
              <div style={{ marginBottom: '3px' }}>
                <span style={{ fontSize: '11px', fontWeight: '600' }}>Phone: </span>
                <div style={{ borderBottom: '1px solid #000', height: '14px' }}></div>
              </div>
              
              <div>
                <span style={{ fontSize: '11px', fontWeight: '600' }}>Address: </span>
                <div style={{ borderBottom: '1px solid #000', height: '14px' }}></div>
              </div>
            </div>

            {/* Ticket Delivery */}
            <div>
              <h3 style={{
                color: colors.navy,
                fontWeight: '700',
                fontSize: '13px',
                marginBottom: '3px'
              }}>Ticket Delivery</h3>
              <p style={{ fontSize: '12px', marginBottom: '2px', margin: '0 0 2px 0' }}>☐ Pick up at USC</p>
              <p style={{ fontSize: '12px', margin: '0' }}>☐ Hold at Will Call</p>
            </div>
          </div>
        </div>

        {/* Total */}
        <div style={{
          borderTop: `2px solid ${colors.navy}`,
          borderBottom: `2px solid ${colors.navy}`,
          padding: '6px 0',
          marginBottom: '8px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{
              fontSize: '15px',
              fontWeight: '700',
              color: colors.navy
            }}>TOTAL AMOUNT:</span>
            <span style={{
              fontSize: '15px',
              fontWeight: '700',
              color: colors.navy,
              minWidth: '140px',
              textAlign: 'center'
            }}>$ ____________</span>
          </div>
        </div>

        {/* Instructions Box */}
        <div style={{
          backgroundColor: colors.lightGray,
          padding: '5px 6px',
          marginBottom: '6px',
          fontSize: '11px',
          borderRadius: '3px',
          lineHeight: '1.4',
          border: `1px solid ${colors.neutralStroke}`
        }}>
          <p style={{ margin: '0 0 2px 0', fontWeight: '700', fontSize: '12px' }}>Check Payment Instructions:</p>
          <p style={{ margin: '0' }}>Make checks payable to <strong>Ukiah Senior Center</strong>, write "AATR" in memo. Mail to: Ukiah Senior Center, 499 Leslie St., Ukiah, CA 95482</p>
        </div>

        {/* QR Code Section - Full Width at Bottom */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          padding: '8px',
          backgroundColor: colors.lightGray,
          borderRadius: '4px',
          border: `1px solid ${colors.neutralStroke}`,
          marginBottom: '6px'
        }}>
          <div style={{ flex: 1 }}>
            <h3 style={{
              color: colors.navy,
              fontWeight: '700',
              fontSize: '14px',
              marginBottom: '2px',
              fontFamily: 'Montserrat, sans-serif'
            }}>
              Complete Your Order Online
            </h3>
            <p style={{
              fontSize: '12px',
              color: colors.black,
              margin: '0',
              fontFamily: 'Montserrat, sans-serif'
            }}>
              Scan the QR code with your phone to submit the form online and pay by credit card
            </p>
          </div>
          <div style={{ textAlign: 'center', minWidth: '100px' }}>
            <QRCodeDisplay 
              url={sponsorshipUrl}
              title=""
              description=""
              size={85}
            />
          </div>
        </div>

        {/* Tax & Signature */}
        <div style={{
          textAlign: 'center',
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '10px',
          lineHeight: '1.4'
        }}>
          <p style={{ margin: '2px 0' }}>
            Donations are tax deductible. Ukiah Senior Center is a 501(c)3 charitable organization • Tax ID: 23-7258082
          </p>
          
          <div style={{ marginTop: '3px' }}>
            <p style={{ margin: '0', fontWeight: '700', fontSize: '11px' }}>
              Clara Lehman, Vice President
            </p>
            <p style={{ margin: '0', fontSize: '10px' }}>
              USC BOARD OF DIRECTORS
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          borderTop: `1px solid ${colors.neutralStroke}`,
          paddingTop: '3px',
          fontFamily: 'Montserrat, sans-serif',
          marginTop: '4px'
        }}>
          <p style={{ 
            color: colors.navy, 
            fontSize: '10px', 
            fontWeight: '700',
            margin: '0',
            letterSpacing: '0.3px'
          }}>
            UKIAH SENIOR CENTER • 499 LESLIE ST, UKIAH, CA 95482<br/>(707) 462-4343 • UKIAHSENIORCENTER.ORG
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
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

        @media print {
          @page {
            margin: 0.3in;
            size: letter;
          }
          
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          body {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
            font-family: Montserrat, sans-serif !important;
            font-size: 12pt;
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

        {/* Header */}
        <div className="text-center mb-3">
          <h1 style={{
            color: colors.navy,
            fontWeight: '700',
            fontSize: '18px',
            marginBottom: '6px',
            fontFamily: 'Georgia, serif'
          }}>
            Support the Ukiah Senior Center
          </h1>
          <p style={{
            color: colors.black,
            fontSize: '12px',
            marginBottom: '8px',
            lineHeight: '1.3'
          }}>
            Purchase Tickets and/or Become a Sponsor
            <br/>
            &apos;An Affair to Remember&apos; • Saturday, April 11, 2026
          </p>
        </div>

        {/* Side-by-side layout: Form left, QR code right */}
        <div className="mb-3" style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          
          {/* Left side: Form content */}
          <div style={{ flex: '3.5' }}>
            
            {/* Sponsorship Levels Section */}
            <div style={{ marginBottom: '8px' }}>
              <h2 style={{
                color: colors.navy,
                fontWeight: '700',
                fontSize: '13px',
                marginBottom: '4px',
                fontFamily: 'Georgia, serif'
              }}>
                ☐ Sponsorship Levels
              </h2>
              
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                border: `1px solid ${colors.neutralStroke}`,
                fontFamily: 'Georgia, serif',
                fontSize: '11px',
                marginBottom: '6px'
              }}>
                <thead>
                  <tr style={{ backgroundColor: colors.lightGray }}>
                    <th style={{
                      color: colors.navy,
                      fontWeight: '600',
                      fontSize: '11px',
                      padding: '3px 4px',
                      textAlign: 'center',
                      border: `1px solid ${colors.neutralStroke}`,
                      width: '6%'
                    }}>☐</th>
                    <th style={{
                      color: colors.navy,
                      fontWeight: '600',
                      fontSize: '11px',
                      padding: '3px 4px',
                      textAlign: 'center',
                      border: `1px solid ${colors.neutralStroke}`,
                      width: '20%'
                    }}>Tier</th>
                    <th style={{
                      color: colors.navy,
                      fontWeight: '600',
                      fontSize: '11px',
                      padding: '3px 4px',
                      textAlign: 'center',
                      border: `1px solid ${colors.neutralStroke}`,
                      width: '14%'
                    }}>Price</th>
                    <th style={{
                      color: colors.navy,
                      fontWeight: '600',
                      fontSize: '11px',
                      padding: '3px 4px',
                      border: `1px solid ${colors.neutralStroke}`,
                      width: '60%'
                    }}>Benefits</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{
                      textAlign: 'center',
                      padding: '2px',
                      border: `1px solid ${colors.neutralStroke}`,
                      fontSize: '14px'
                    }}></td>
                    <td style={{
                      color: colors.burgundy,
                      fontWeight: '600',
                      fontSize: '11px',
                      padding: '2px 3px',
                      border: `1px solid ${colors.neutralStroke}`,
                      textAlign: 'center'
                    }}>Diamond</td>
                    <td style={{
                      color: colors.burgundy,
                      fontWeight: '600',
                      fontSize: '11px',
                      padding: '2px 3px',
                      border: `1px solid ${colors.neutralStroke}`,
                      textAlign: 'center'
                    }}>$2,500</td>
                    <td style={{
                      fontSize: '10px',
                      padding: '2px 3px',
                      border: `1px solid ${colors.neutralStroke}`,
                      lineHeight: '1.3'
                    }}>2 Tables (16 seats) • 4 wine • Recognition • Banner • Media</td>
                  </tr>
                  <tr>
                    <td style={{
                      textAlign: 'center',
                      padding: '2px',
                      border: `1px solid ${colors.neutralStroke}`,
                      fontSize: '14px'
                    }}></td>
                    <td style={{
                      color: colors.navy,
                      fontWeight: '600',
                      fontSize: '11px',
                      padding: '2px 3px',
                      border: `1px solid ${colors.neutralStroke}`,
                      textAlign: 'center'
                    }}>Platinum</td>
                    <td style={{
                      color: colors.navy,
                      fontWeight: '600',
                      fontSize: '11px',
                      padding: '2px 3px',
                      border: `1px solid ${colors.neutralStroke}`,
                      textAlign: 'center'
                    }}>$1,500</td>
                    <td style={{
                      fontSize: '10px',
                      padding: '2px 3px',
                      border: `1px solid ${colors.neutralStroke}`,
                      lineHeight: '1.3'
                    }}>1 Table (8 seats) • 2 wine • Recognition • Banner • Media</td>
                  </tr>
                  <tr>
                    <td style={{
                      textAlign: 'center',
                      padding: '2px',
                      border: `1px solid ${colors.neutralStroke}`,
                      fontSize: '14px'
                    }}></td>
                    <td style={{
                      color: colors.burgundy,
                      fontWeight: '600',
                      fontSize: '11px',
                      padding: '2px 3px',
                      border: `1px solid ${colors.neutralStroke}`,
                      textAlign: 'center'
                    }}>Gold</td>
                    <td style={{
                      color: colors.burgundy,
                      fontWeight: '600',
                      fontSize: '11px',
                      padding: '2px 3px',
                      border: `1px solid ${colors.neutralStroke}`,
                      textAlign: 'center'
                    }}>$750</td>
                    <td style={{
                      fontSize: '10px',
                      padding: '2px 3px',
                      border: `1px solid ${colors.neutralStroke}`,
                      lineHeight: '1.3'
                    }}>4 Tickets • 1 wine • Reserved seating • Media</td>
                  </tr>
                  <tr>
                    <td style={{
                      textAlign: 'center',
                      padding: '2px',
                      border: `1px solid ${colors.neutralStroke}`,
                      fontSize: '14px'
                    }}></td>
                    <td style={{
                      color: colors.navy,
                      fontWeight: '600',
                      fontSize: '11px',
                      padding: '2px 3px',
                      border: `1px solid ${colors.neutralStroke}`,
                      textAlign: 'center'
                    }}>Ruby</td>
                    <td style={{
                      color: colors.navy,
                      fontWeight: '600',
                      fontSize: '11px',
                      padding: '2px 3px',
                      border: `1px solid ${colors.neutralStroke}`,
                      textAlign: 'center'
                    }}>$400</td>
                    <td style={{
                      fontSize: '10px',
                      padding: '2px 3px',
                      border: `1px solid ${colors.neutralStroke}`,
                      lineHeight: '1.3'
                    }}>2 Tickets • 1 wine • Reserved seating • Media</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Individual Tickets and Donations */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
              <div>
                <h3 style={{
                  color: colors.navy,
                  fontWeight: '600',
                  fontSize: '12px',
                  marginBottom: '3px'
                }}>Individual Tickets</h3>
                <p style={{ fontSize: '11px', marginBottom: '2px' }}>
                  # of Tickets: _____ @ $100
                </p>
                <p style={{ fontSize: '9px', marginBottom: '2px' }}>
                  (After 3/28/26: $110)
                </p>
              </div>
              
              <div>
                <h3 style={{
                  color: colors.navy,
                  fontWeight: '600',
                  fontSize: '12px',
                  marginBottom: '3px'
                }}>Donations</h3>
                <p style={{ fontSize: '11px', marginBottom: '2px' }}>
                  Monetary: $ _____
                </p>
                <p style={{ fontSize: '11px' }}>
                  Auction Item: __________
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div style={{ marginBottom: '6px' }}>
              <h3 style={{
                color: colors.navy,
                fontWeight: '600',
                fontSize: '12px',
                marginBottom: '3px'
              }}>Contact Information</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '3px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '600' }}>Name: </span>
                  <div style={{ borderBottom: '1px solid #000', height: '14px' }}></div>
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '600' }}>Email: </span>
                  <div style={{ borderBottom: '1px solid #000', height: '14px' }}></div>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '600' }}>Phone: </span>
                  <div style={{ borderBottom: '1px solid #000', height: '14px' }}></div>
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '600' }}>Address: </span>
                  <div style={{ borderBottom: '1px solid #000', height: '14px' }}></div>
                </div>
              </div>
            </div>

            {/* Payment and Delivery */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '6px' }}>
              <div>
                <h3 style={{
                  color: colors.navy,
                  fontWeight: '600',
                  fontSize: '12px',
                  marginBottom: '3px'
                }}>Payment Method</h3>
                <p style={{ fontSize: '11px', marginBottom: '2px' }}>☐ Check</p>
                <p style={{ fontSize: '11px' }}>☐ Credit Card (online)</p>
              </div>
              
              <div>
                <h3 style={{
                  color: colors.navy,
                  fontWeight: '600',
                  fontSize: '12px',
                  marginBottom: '3px'
                }}>Ticket Delivery</h3>
                <p style={{ fontSize: '11px', marginBottom: '2px' }}>☐ Pick up at USC</p>
                <p style={{ fontSize: '11px' }}>☐ Will Call</p>
              </div>
            </div>

            {/* Total */}
            <div style={{
              borderTop: `2px solid ${colors.navy}`,
              paddingTop: '4px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: colors.navy
                }}>TOTAL:</span>
                <span style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: colors.navy
                }}>$ ____________</span>
              </div>
            </div>
          </div>

          {/* Right side: QR Code */}
          <div style={{ flex: '1', textAlign: 'center', minWidth: '100px' }}>
            <h3 style={{
              color: colors.navy,
              fontWeight: '700',
              fontSize: '11px',
              marginBottom: '4px',
              fontFamily: 'Georgia, serif'
            }}>
              Complete
              <br/>
              Online
            </h3>
            
            <div style={{
              backgroundColor: colors.white,
              padding: '4px',
              textAlign: 'center'
            }}>
              <QRCodeDisplay 
                url={sponsorshipUrl}
                title=""
                description=""
                size={75}
              />
              <p style={{
                fontSize: '9px',
                color: colors.black,
                marginTop: '3px',
                fontWeight: '500'
              }}>
                Scan here
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div style={{
          backgroundColor: colors.lightGray,
          padding: '4px 6px',
          marginBottom: '4px',
          fontSize: '10px',
          borderRadius: '3px',
          lineHeight: '1.4'
        }}>
          <p style={{ marginBottom: '2px', fontWeight: '700', fontSize: '11px' }}>Check Instructions:</p>
          <p style={{ margin: 0 }}>Make payable to <strong>Ukiah Senior Center</strong>, memo &quot;AATR&quot;. Mail to: Ukiah Senior Center, 499 Leslie St., Ukiah, CA 95482</p>
        </div>

        {/* Tax Information */}
        <div style={{
          textAlign: 'center',
          fontFamily: 'Georgia, serif',
          marginBottom: '3px',
          fontSize: '9px',
          lineHeight: '1.3'
        }}>
          <p style={{ margin: '0 0 2px 0' }}>
            Donations are tax deductible. 501(c)3 • Tax ID: 23-7258082
          </p>
          
          <div style={{ marginTop: '3px' }}>
            <p style={{ margin: '0 0 1px 0', fontWeight: '600', fontSize: '10px' }}>
              Clara Lehman, Vice President
            </p>
            <p style={{ margin: '0', fontSize: '9px' }}>
              USC BOARD OF DIRECTORS
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          borderTop: `1px solid ${colors.neutralStroke}`,
          paddingTop: '3px',
          fontFamily: 'Georgia, serif'
        }}>
          <p style={{ 
            color: colors.navy, 
            fontSize: '9px', 
            fontWeight: '600',
            margin: '0',
            letterSpacing: '0.4px'
          }}>
            UKIAH SENIOR CENTER • 499 LESLIE ST, UKIAH, CA 95482<br/>(707) 462-4343 • UKIAHSENIORCENTER.ORG
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
            margin: 0.35in;
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