import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {

    if (request.url.includes("api/orders")) {

        const bearerToken = request.headers.get('authorization');
        if (!bearerToken) {
            return new NextResponse('This endpoint requires bearer token');
        } else {
            const token = bearerToken?.split(' ')[1];
            // verify token
            const response = await fetch(
                `http://localhost:3000/api/verifyToken`,
                {
                    body: JSON.stringify({ "token": token }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST'
                }
            );
            let data = await response.json();

            if (data.status == 'invalid') {
                return new NextResponse("Invalid Token");
            }
        }
    }
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/api/:path*',
}
