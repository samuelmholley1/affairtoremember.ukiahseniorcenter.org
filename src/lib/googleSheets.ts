import { google } from 'googleapis'
import { GoogleAuth } from 'google-auth-library'

// Initialize Google Sheets API
const getGoogleSheetsInstance = async () => {
  try {
    console.log('Initializing Google Sheets API...')
    console.log('Environment check:')
    console.log('- GOOGLE_SERVICE_ACCOUNT_EMAIL:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ? 'Set' : 'Missing')
    console.log('- GOOGLE_PRIVATE_KEY:', process.env.GOOGLE_PRIVATE_KEY ? 'Set (length: ' + process.env.GOOGLE_PRIVATE_KEY.length + ')' : 'Missing')
    console.log('- GOOGLE_PROJECT_ID:', process.env.GOOGLE_PROJECT_ID ? 'Set' : 'Missing')
    console.log('- GOOGLE_SHEETS_SPREADSHEET_ID:', process.env.GOOGLE_SHEETS_SPREADSHEET_ID ? 'Set' : 'Missing')

    const auth = new GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        project_id: process.env.GOOGLE_PROJECT_ID,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    console.log('✓ Google Sheets API initialized successfully')
    return sheets
  } catch (error) {
    console.error('Error initializing Google Sheets:', error)
    throw new Error(`Failed to initialize Google Sheets API: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Add a row to a specific sheet tab
export const addRowToSheet = async (
  tabName: string,
  values: (string | number)[]
) => {
  try {
    console.log(`Adding row to sheet tab: "${tabName}"`)
    console.log('Row data:', values)
    
    const sheets = await getGoogleSheetsInstance()
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID

    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID environment variable is required')
    }

    console.log('Attempting to add row to spreadsheet:', spreadsheetId)

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${tabName}!A:ZZ`, // Use full range to auto-detect columns
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [values],
      },
    })

    console.log('✓ Successfully added row to Google Sheets')
    console.log('Response:', response.data)

    return {
      success: true,
      response: response.data,
      rowsAdded: response.data.updates?.updatedRows || 0,
    }
  } catch (error) {
    console.error('Error adding row to sheet:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: (error as { code?: string })?.code,
      status: (error as { status?: number })?.status,
      statusText: (error as { statusText?: string })?.statusText,
    })
    throw error
  }
}

// Read all rows from a sheet tab (skipping header row)
export const getSheetRows = async (tabName: string) => {
  const sheets = await getGoogleSheetsInstance()
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID environment variable is required')
  }

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${tabName}!A:ZZ`,
  })

  const allRows = response.data.values || []
  // First row is headers, rest is data
  const headers = allRows[0] || []
  const dataRows = allRows.slice(1)

  return { headers, dataRows }
}

// Validate that the sheet exists and has the correct structure
export const validateSheetStructure = async (tabName: string, expectedHeaders: string[]) => {
  try {
    const sheets = await getGoogleSheetsInstance()
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID

    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID environment variable is required')
    }

    // Get the first row (headers) of the specified tab
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${tabName}!1:1`,
    })

    const actualHeaders = response.data.values?.[0] || []
    
    // Check if headers match (allowing for some flexibility)
    const headersMatch = expectedHeaders.every((header, index) => 
      actualHeaders[index]?.toLowerCase().trim() === header.toLowerCase().trim()
    )

    return {
      exists: true,
      headersMatch,
      actualHeaders,
      expectedHeaders,
    }
  } catch (error) {
    console.error('Error validating sheet structure:', error)
    return {
      exists: false,
      headersMatch: false,
      actualHeaders: [],
      expectedHeaders,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Generate a unique submission ID
export const generateSubmissionId = (prefix: string = 'sub'): string => {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `${prefix}-${timestamp}-${random}`
}

// Delete rows from a sheet by matching submission IDs
export const deleteRowsBySubmissionIds = async (
  tabName: string,
  submissionIds: string[]
) => {
  const sheets = await getGoogleSheetsInstance()
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID environment variable is required')
  }

  // Get all data to find row indices
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${tabName}!A:ZZ`,
  })

  const allRows = response.data.values || []
  const headers = allRows[0] || []
  const submissionIdCol = headers.findIndex(
    (h: string) => h.toLowerCase().includes('submission id')
  )

  if (submissionIdCol === -1) {
    throw new Error('Could not find Submission ID column')
  }

  // Get the sheet's numeric ID (gid) for batchUpdate
  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId })
  const sheetMeta = spreadsheet.data.sheets?.find(
    (s) => s.properties?.title === tabName
  )
  const sheetId = sheetMeta?.properties?.sheetId
  if (sheetId === undefined) {
    throw new Error(`Sheet tab "${tabName}" not found`)
  }

  // Find matching row indices (1-indexed, header is row 0)
  const idsSet = new Set(submissionIds)
  const rowIndicesToDelete: number[] = []
  for (let i = 1; i < allRows.length; i++) {
    const id = allRows[i][submissionIdCol]
    if (id && idsSet.has(id)) {
      rowIndicesToDelete.push(i)
    }
  }

  if (rowIndicesToDelete.length === 0) {
    return { deleted: 0 }
  }

  // Delete from bottom to top so indices don't shift
  rowIndicesToDelete.sort((a, b) => b - a)

  const requests = rowIndicesToDelete.map((rowIndex) => ({
    deleteDimension: {
      range: {
        sheetId,
        dimension: 'ROWS' as const,
        startIndex: rowIndex,
        endIndex: rowIndex + 1,
      },
    },
  }))

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: { requests },
  })

  return { deleted: rowIndicesToDelete.length }
}

// Helper to get client IP address (for logging purposes)
export const getClientIP = (request: Request): string => {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  return 'unknown'
}