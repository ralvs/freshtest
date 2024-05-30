import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { checkTokenCookie } from './lib/helpers'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/profile')) {
    // Example authentication check
    // You can customize this part based on how you manage authentication
    const cookie = request.cookies.get(process.env.COOKIE_NAME!)
    const user = await checkTokenCookie(cookie)

    if (!user) {
      // If no user, redirect to login page
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Allow the request to proceed
  return NextResponse.next()
}

// Enable the middleware for the specified paths
export const config = {
  matcher: '/profile/:path*',
}
