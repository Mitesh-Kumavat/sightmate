import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {

    const pathname = request.nextUrl.pathname;

    if (pathname === "/dashboard") {
        return NextResponse.redirect(new URL("/dashboard/scene", request.url));
    }

    return NextResponse.next();
}