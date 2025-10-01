import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

export async function POST(request: NextRequest) {
  try {
    const { url, filename } = await request.json()
    
    if (!url || !filename) {
      return NextResponse.json(
        { error: 'URL and filename are required' },
        { status: 400 }
      )
    }

    // Launch puppeteer browser
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    })

    const page = await browser.newPage()
    
    // Set viewport for letter size
    await page.setViewport({ width: 816, height: 1056 }) // 8.5x11 inches at 96 DPI
    
    // Navigate to the page with print parameters
    const printUrl = `${url}?print=true`
    await page.goto(printUrl, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    })

    // Wait for any dynamic content to load
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'letter',
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      },
      printBackground: true,
      preferCSSPageSize: false
    })

    await browser.close()

    // Return PDF as response
    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    })

  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}