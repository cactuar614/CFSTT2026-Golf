import { NextResponse } from 'next/server';
import { auth, authEnabled } from '@/lib/auth';

/** Gate every page behind Google sign-in once auth env vars are configured. */
export default authEnabled
  ? auth
  : function middleware() {
      return NextResponse.next();
    };

export const config = {
  // Everything except auth routes, the sign-in page, Next internals,
  // and static files (anything with a file extension: sw.js, icons, manifest…).
  matcher: ['/((?!api/auth|signin|_next|.*\\..*).*)'],
};
