import { NextRequest, NextResponse } from 'next/server'
import { addRowToSheet, generateSubmissionId, getClientIP, validateSheetStructure } from '@/lib/googleSheets'

interface SponsorshipData {
  sponsorshipLevel: string
  ticketQuantity: number
  ticketPrice: number
  monetaryDonation: string
  silentAuctionDonation: string
  name: string
  address: string
  phone: string
  email: string
  paymentMethod: 'credit' | 'check'
  ticketDelivery: 'pickup' | 'willcall'
  formType: string
  timestamp: string
  userAgent: string
  referrer: string
  paymentStatus?: string
}

const SPONSORSHIP_AMOUNTS = {
  'diamond': 2500,
  'platinum': 1500,
  'gold': 750,
  'ruby': 400
} as const

const EXPECTED_HEADERS = [
  'Timestamp',
  'Sponsorship Level',
  'Sponsorship Amount',
  'Ticket Quantity',
  'Ticket Price',
  'Ticket Total',
  'Monetary Donation',
  'Silent Auction Donation',
  'Name',
  'Email',
  'Phone',
  'Address',
  'Payment Method',
  'CC Last 4',
  'CC Expiry',
  'CC CVC',
  'CC Name',
  'CC Zip',
  'Ticket Delivery',
  'Total Amount',
  'Submission ID',
  'IP Address',
  'User Agent',
  'Referrer',
  'Status'
]

export async function POST(request: NextRequest) {
  try {
    const data: SponsorshipData = await request.json()
    
    // Validate required fields
    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields: name, email, and phone are required',
      }, { status: 400 })
    }

    // Validate form type
    if (data.formType !== 'table-sponsors') {
      return NextResponse.json({
        success: false,
        message: 'Invalid form type for this endpoint',
      }, { status: 400 })
    }

    // Calculate amounts
    const sponsorshipAmount = data.sponsorshipLevel ? 
      SPONSORSHIP_AMOUNTS[data.sponsorshipLevel as keyof typeof SPONSORSHIP_AMOUNTS] || 0 : 0
    const ticketTotal = (data.ticketQuantity || 0) * (data.ticketPrice || 0)
    const monetaryDonation = parseFloat(data.monetaryDonation) || 0
    const totalAmount = sponsorshipAmount + ticketTotal + monetaryDonation

    // Generate submission details
    const submissionId = generateSubmissionId('sponsor')
    const timestamp = new Date()
    const clientIP = getClientIP(request)

    // Temporarily disable validation to test basic functionality
    // TODO: Re-enable after confirming sheet setup
    /*
    const validation = await validateSheetStructure('Table Sponsorships', EXPECTED_HEADERS)
    if (!validation.exists) {
      console.error('Sheet validation failed:', validation.error)
      return NextResponse.json({
        success: false,
        message: 'Google Sheets configuration error. Please contact support.',
      }, { status: 500 })
    }
    */

    // Prepare data for Google Sheets (no credit card data stored)
    const rowData = [
      timestamp.toISOString(),                                              // A: Timestamp
      data.sponsorshipLevel || '',                                          // B: Sponsorship Level
      sponsorshipAmount,                                                    // C: Sponsorship Amount
      data.ticketQuantity || 0,                                             // D: Ticket Quantity
      data.ticketPrice || 0,                                                // E: Ticket Price
      ticketTotal,                                                          // F: Ticket Total
      monetaryDonation,                                                     // G: Monetary Donation
      data.silentAuctionDonation || '',                                    // H: Silent Auction Donation
      data.name,                                                            // I: Name
      data.email,                                                           // J: Email
      data.phone,                                                           // K: Phone
      data.address || '',                                                   // L: Address
      data.paymentMethod || '',                                             // M: Payment Method
      data.paymentMethod === 'credit' ? 'Processed via Stripe' : '',       // N: CC Last 4 (or Stripe note)
      '',                                                                   // O: CC Expiry (not stored)
      '',                                                                   // P: CC CVC (not stored)
      '',                                                                   // Q: CC Name (not stored)
      '',                                                                   // R: CC Zip (not stored)
      data.ticketDelivery || '',                                            // S: Ticket Delivery
      totalAmount,                                                          // T: Total Amount
      submissionId,                                                         // U: Submission ID
      clientIP,                                                             // V: IP Address
      data.userAgent || '',                                                 // W: User Agent
      data.referrer || '',                                                  // X: Referrer
      data.paymentStatus || 'Submitted'                                     // Y: Status
    ]

    // Add row to Google Sheets with better error handling
    try {
      const result = await addRowToSheet('Table Sponsorships', rowData)
      console.log('Google Sheets result:', result)
    } catch (sheetError) {
      console.error('Google Sheets error details:', sheetError)
      return NextResponse.json({
        success: false,
        message: 'Failed to save to Google Sheets. Please try again.',
        error: process.env.NODE_ENV === 'development' ? 
          (sheetError instanceof Error ? sheetError.message : 'Unknown Google Sheets error') : 
          'Sheet integration error'
      }, { status: 500 })
    }

    // Log successful submission
    console.log('Table sponsorship submitted successfully:', {
      submissionId,
      sponsor: data.name,
      email: data.email,
      sponsorshipLevel: data.sponsorshipLevel,
      totalAmount,
      timestamp: timestamp.toISOString()
    })

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Table sponsorship submitted successfully',
      submissionId,
      timestamp: timestamp.toISOString(),
      formType: 'table-sponsors',
      totalAmount
    })

  } catch (error) {
    console.error('Error processing table sponsorship:', error)

    // Return error response
    return NextResponse.json({
      success: false,
      message: 'Error processing table sponsorship submission',
      error: process.env.NODE_ENV === 'development' ? 
        (error instanceof Error ? error.message : 'Unknown error') : 
        'Internal server error'
    }, { status: 500 })
  }
}