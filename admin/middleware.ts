import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/auth'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('authToken')?.value;
  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute && authToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!isPublicRoute && !authToken) {
    const redirectUrl = new URL('/auth', request.url);
    redirectUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|fonts|images|[\\w-]+\\.\\w+).*)'],
};
