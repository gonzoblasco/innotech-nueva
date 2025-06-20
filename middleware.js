import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Rutas que requieren autenticación
const isProtectedRoute = createRouteMatcher(['/chat/(.*)', '/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  // Proteger rutas de chat
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
