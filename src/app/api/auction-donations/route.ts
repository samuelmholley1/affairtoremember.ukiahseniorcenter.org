import { NextRequest, NextResponse } from 'next/server'
import { addRowToSheet, generateSubmissionId, getClientIP, validateSheetStructure } from '@/lib/googleSheets'

interface AuctionDonationData {
  name: string
  email: string
  phone: string
  address: string
  itemDescription: string
  estimatedValue: string
  pickupRequired: string
  specialInstructions: string
  contactPreference: string
  formType: string
  timestamp: string
  userAgent: string
}

const EXPECTED_HEADERS = [
  'Timestamp',
  'Name',
  'Email', 
  'Phone',
  'Address',
  'Item Description',
  'Estimated Value',
  'Pickup Required',
  'Special Instructions',
  'Contact Preference',
  'Submission ID',
  'IP Address',
  'User Agent',
  'Status'
]

export async function POST(request: NextRequest) {
  try {
    const data: AuctionDonationData = await request.json()
    
    // Validate required fields
    if (!data.name || !data.email || !data.itemDescription) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields: name, email, and item description are required',
      }, { status: 400 })
    }

    // Validate form type
    if (data.formType !== 'auction-donations') {
      return NextResponse.json({
        success: false,
        message: 'Invalid form type for this endpoint',
      }, { status: 400 })
    }

    // Generate submission details
    const submissionId = generateSubmissionId('auction')
    const timestamp = new Date()
    const clientIP = getClientIP(request)

    // Validate sheet structure (optional - can be removed in production for performance)
    const validation = await validateSheetStructure('Auction Donations', EXPECTED_HEADERS)
    if (!validation.exists) {
      console.error('Sheet validation failed:', validation.error)
      return NextResponse.json({
        success: false,
        message: 'Google Sheets configuration error. Please contact support.',
      }, { status: 500 })
    }

    // Prepare data for Google Sheets
    const rowData = [
      timestamp.toISOString(),                    // A: Timestamp
      data.name,                                  // B: Name
      data.email,                                 // C: Email
      data.phone || '',                           // D: Phone
      data.address || '',                         // E: Address
      data.itemDescription,                       // F: Item Description
      data.estimatedValue || '',                  // G: Estimated Value
      data.pickupRequired || 'no',                // H: Pickup Required
      data.specialInstructions || '',             // I: Special Instructions
      data.contactPreference || 'email',          // J: Contact Preference
      submissionId,                               // K: Submission ID
      clientIP,                                   // L: IP Address
      data.userAgent || '',                       // M: User Agent
      'Submitted'                                 // N: Status
    ]

    // Add row to Google Sheets
    await addRowToSheet('Auction Donations', rowData)

    // Log successful submission
    console.log('Auction donation submitted successfully:', {
      submissionId,
      donor: data.name,
      email: data.email,
      timestamp: timestamp.toISOString()
    })

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Auction donation submitted successfully',
      submissionId,
      timestamp: timestamp.toISOString(),
      formType: 'auction-donations'
    })

  } catch (error) {
    console.error('Error processing auction donation:', error)

    // Return error response
    return NextResponse.json({
      success: false,
      message: 'Error processing auction donation submission',
      error: process.env.NODE_ENV === 'development' ? 
        (error instanceof Error ? error.message : 'Unknown error') : 
        'Internal server error'
    }, { status: 500 })
  }
}