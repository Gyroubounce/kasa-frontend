// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Protection uniquement pour add-property
  if (pathname.startsWith('/add-property')) {
    const token = request.cookies.get('token')?.value
    
    if (!token) {
      // Redirection vers login avec return URL
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('returnUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/add-property/:path*',
}