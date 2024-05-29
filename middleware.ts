import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the request is for the /profile URL
  if (pathname.startsWith('/profile')) {
    // Example authentication check
    // You can customize this part based on how you manage authentication
    const token = request.cookies.get('freshcells')?.value

    if (!token) {
      // If no token, redirect to login page
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }

    // You might want to verify the token or perform other checks here.
  }

  // Allow the request to proceed
  return NextResponse.next()
}

// Enable the middleware for the specified paths
export const config = {
  matcher: '/profile/:path*',
}
