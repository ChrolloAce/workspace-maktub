// Temporarily disable middleware for Vercel deployment
// Remove this file or comment out to enable authentication

export function middleware() {
  // No middleware for now - allows all requests
  return
}

export const config = {
  matcher: [],
}
