import { NextRequest, NextResponse } from 'next/server'
import { getSheetRows } from '@/lib/googleSheets'
import { sendNotificationEmail, buildAuctionDonationEmail } from '@/lib/email'

// One-time endpoint: reads every row from "Auction Donations" sheet and emails each one.
// Hit it once, then delete this file.
// GET /api/trigger-auction-emails?secret=AATR2026
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  if (secret !== 'AATR2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { headers, dataRows } = await getSheetRows('Auction Donations')
    console.log(`Found ${dataRows.length} rows in Auction Donations sheet`)
    console.log('Headers:', headers)

    // Column mapping (A=0):
    // A: Timestamp, B: Name, C: Email, D: Phone, E: Address,
    // F: Item Description, G: Estimated Value, H: Pickup Required,
    // I: Special Instructions, J: Contact Preference, K: Submission ID,
    // L: IP Address, M: User Agent, N: Status, O: Auction Type

    const results: { row: number; name: string; success: boolean; error?: string }[] = []

    for (let i = 0; i < dataRows.length; i++) {
      const row = dataRows[i]
      const rowNum = i + 2 // 1-indexed + header row

      const name = row[1] || 'Unknown'
      const email = row[2] || ''
      const phone = row[3] || ''
      const address = row[4] || ''
      const itemDescription = row[5] || ''
      const estimatedValue = row[6] || ''
      const pickupRequired = row[7] || 'no'
      const specialInstructions = row[8] || ''
      const contactPreference = row[9] || 'email'
      const submissionId = row[10] || `row-${rowNum}`
      const clientIP = row[11] || 'N/A'
      const userAgent = row[12] || 'N/A'
      const auctionType = row[14] || ''
      const timestamp = row[0] || new Date().toISOString()

      const emailHtml = buildAuctionDonationEmail({
        submissionId,
        timestamp,
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
        hasPhoto: false,
        clientIP,
        userAgent,
      })

      const emailResult = await sendNotificationEmail({
        subject: `[Auction Donation Row ${rowNum}] ${name} — ${auctionType || 'Type not specified'}`,
        html: emailHtml,
      })

      results.push({
        row: rowNum,
        name,
        success: emailResult.success,
        error: emailResult.success ? undefined : emailResult.error,
      })

      // Small delay to avoid rate-limiting from Zoho
      await new Promise(resolve => setTimeout(resolve, 1500))
    }

    const sent = results.filter(r => r.success).length
    const failed = results.filter(r => !r.success).length

    return NextResponse.json({
      message: `Done. Sent ${sent} emails, ${failed} failed.`,
      total: dataRows.length,
      sent,
      failed,
      results,
    })
  } catch (error) {
    console.error('Error triggering auction emails:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 })
  }
}
