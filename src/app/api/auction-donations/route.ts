import { NextRequest, NextResponse } from 'next/server'
import { addRowToSheet, generateSubmissionId, getClientIP } from '@/lib/googleSheets'
import { sendNotificationEmail, buildAuctionDonationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string || ''
    const address = formData.get('address') as string || ''
    const itemDescription = formData.get('itemDescription') as string
    const estimatedValue = formData.get('estimatedValue') as string || ''
    const pickupRequired = formData.get('pickupRequired') as string || 'no'
    const specialInstructions = formData.get('specialInstructions') as string || ''
    const contactPreference = formData.get('contactPreference') as string || 'email'
    const auctionType = formData.get('auctionType') as string || ''
    const formType = formData.get('formType') as string
    const userAgent = formData.get('userAgent') as string || ''
    const photoFile = formData.get('photo') as File | null

    // Validate required fields
    if (!name || !email || !itemDescription) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields: name, email, and item description are required',
      }, { status: 400 })
    }

    // Validate form type
    if (formType !== 'auction-donations') {
      return NextResponse.json({
        success: false,
        message: 'Invalid form type for this endpoint',
      }, { status: 400 })
    }

    // Generate submission details
    const submissionId = generateSubmissionId('auction')
    const timestamp = new Date()
    const clientIP = getClientIP(request)

    // Prepare data for Google Sheets
    // Column O = Auction Type (new column — add header "Auction Type" in column O)
    const rowData = [
      timestamp.toISOString(),                    // A: Timestamp
      name,                                       // B: Name
      email,                                      // C: Email
      phone,                                      // D: Phone
      address,                                    // E: Address
      itemDescription,                            // F: Item Description
      estimatedValue,                             // G: Estimated Value
      pickupRequired,                             // H: Pickup Required
      specialInstructions,                        // I: Special Instructions
      contactPreference,                          // J: Contact Preference
      submissionId,                               // K: Submission ID
      clientIP,                                   // L: IP Address
      userAgent,                                  // M: User Agent
      'Submitted',                                // N: Status
      auctionType,                                // O: Auction Type
    ]

    // Add row to Google Sheets
    try {
      const result = await addRowToSheet('Auction Donations', rowData)
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

    // Build photo attachment for email (if provided)
    let photoAttachment = undefined
    let hasPhoto = false
    if (photoFile && photoFile.size > 0) {
      try {
        const arrayBuffer = await photoFile.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        photoAttachment = [{
          filename: photoFile.name,
          content: buffer,
          contentType: photoFile.type,
        }]
        hasPhoto = true
      } catch (photoErr) {
        console.error('Error processing photo:', photoErr)
      }
    }

    // Send notification email
    const emailHtml = buildAuctionDonationEmail({
      submissionId,
      timestamp: timestamp.toISOString(),
      name,
      email,
      phone,
      address,
      itemDescription,
      estimatedValue,
      pickupRequired,
      specialInstructions,
      contactPreference,
      auctionType,
      hasPhoto,
      clientIP,
      userAgent,
    })

    await sendNotificationEmail({
      subject: `[New Auction Donation] ${name} — ${auctionType || 'Type not specified'}`,
      html: emailHtml,
      attachments: photoAttachment,
    })

    // Log successful submission
    console.log('Auction donation submitted successfully:', {
      submissionId,
      donor: name,
      email,
      auctionType,
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

    return NextResponse.json({
      success: false,
      message: 'Error processing auction donation submission',
      error: process.env.NODE_ENV === 'development' ? 
        (error instanceof Error ? error.message : 'Unknown error') : 
        'Internal server error'
    }, { status: 500 })
  }
}
