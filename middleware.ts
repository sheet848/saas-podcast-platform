// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/', // homepage is public
  '/create-podcast',
  '/discover',
]);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req) && !auth?.userId) {
    // user not signed in → go to sign-in
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // signed in or public route → continue
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|.*\\..*).*)', // all routes except static assets
    '/(api|trpc)(.*)',        // api routes
  ],
};
