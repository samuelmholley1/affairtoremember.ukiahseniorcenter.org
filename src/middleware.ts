import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Protected routes that require admin authentication
  const protectedRoutes = ['/qr-codes', '/sponsorship-form', '/auction-letter']
  
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )
  
  if (isProtectedRoute) {
    // Check if user is authenticated
    const adminAuth = request.cookies.get('adminAuth')?.value
    
    if (adminAuth !== 'true') {
      // Redirect to admin login page
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/qr-codes/:path*', '/sponsorship-form/:path*', '/auction-letter/:path*']
}