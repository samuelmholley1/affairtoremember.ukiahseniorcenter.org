import { NextRequest, NextResponse } from 'next/server'
import { deleteRowsBySubmissionIds } from '@/lib/googleSheets'

export async function POST(request: NextRequest) {
  try {
    const { submissionIds, password } = await request.json()

    // Simple auth guard
    if (password !== 'USC123!') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    if (!Array.isArray(submissionIds) || submissionIds.length === 0) {
      return NextResponse.json({ success: false, message: 'submissionIds array required' }, { status: 400 })
    }

    const result = await deleteRowsBySubmissionIds('Auction Donations', submissionIds)

    return NextResponse.json({ success: true, ...result })
  } catch (error) {
    console.error('Error deleting rows:', error)
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
