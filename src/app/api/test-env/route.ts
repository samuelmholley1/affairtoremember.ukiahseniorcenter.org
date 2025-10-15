import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check if environment variables are set
    const envCheck = {
      GOOGLE_SERVICE_ACCOUNT_EMAIL: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      GOOGLE_PRIVATE_KEY: !!process.env.GOOGLE_PRIVATE_KEY,
      GOOGLE_PROJECT_ID: !!process.env.GOOGLE_PROJECT_ID,
      GOOGLE_SHEETS_SPREADSHEET_ID: !!process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      
      // Check private key format (first and last 50 characters)
      privateKeyStart: process.env.GOOGLE_PRIVATE_KEY?.substring(0, 50),
      privateKeyEnd: process.env.GOOGLE_PRIVATE_KEY?.substring(-50),
      privateKeyLength: process.env.GOOGLE_PRIVATE_KEY?.length,
      
      // Check for common formatting issues
      hasNewlines: process.env.GOOGLE_PRIVATE_KEY?.includes('\n'),
      hasQuotes: process.env.GOOGLE_PRIVATE_KEY?.includes('"'),
      startsWithBegin: process.env.GOOGLE_PRIVATE_KEY?.startsWith('-----BEGIN'),
      endsWithEnd: process.env.GOOGLE_PRIVATE_KEY?.endsWith('-----')
    }

    return NextResponse.json({
      success: true,
      environment: process.env.NODE_ENV,
      envCheck
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      environment: process.env.NODE_ENV
    }, { status: 500 })
  }
}