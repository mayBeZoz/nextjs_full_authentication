import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { checkUserRouteAccess } from './lib/routes';
import { decodeAuthToken } from './lib/utils';
 

export function middleware(request: NextRequest) {

    const pathname = request.nextUrl.pathname;
    const accessToken = request.cookies.get("access_token")?.value || "";

    const tokenPayload = decodeAuthToken(accessToken)

    const userRole = tokenPayload?.role || null
    const canAccess = checkUserRouteAccess(userRole,pathname)
    
    if (!canAccess) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
}
 

export const config = {
    matcher: [
        '/((?!api|_next|.*\\..*).*)',
    ],
};