import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/'])

export default clerkMiddleware((auth, req) => {
  // auth could be undefined if no Clerk session is found
  //const userId = auth?.userId;
  if (!isPublicRoute(req) && (!auth || !auth.userId)) {
     // redirect to sign-in if not authenticated
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // If authenticated or public route, just continue
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};