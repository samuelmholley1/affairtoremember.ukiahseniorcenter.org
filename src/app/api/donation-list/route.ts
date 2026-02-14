import { NextResponse } from 'next/server'
import { getSheetRows } from '@/lib/googleSheets'

export async function GET() {
  try {
    const { headers, dataRows } = await getSheetRows('Auction Donations')

    // Map rows to objects using headers
    const donations = dataRows.map((row) => {
      const obj: Record<string, string> = {}
      headers.forEach((header: string, i: number) => {
        obj[header] = row[i] || ''
      })
      return obj
    })

    return NextResponse.json({ success: true, donations, headers })
  } catch (error) {
    console.error('Error fetching donation list:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch donations',
        error:
          process.env.NODE_ENV === 'development'
            ? error instanceof Error
              ? error.message
              : 'Unknown error'
            : 'Internal server error',
      },
      { status: 500 }
    )
  }
}
