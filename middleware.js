import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "@/app/_lib/auth"; // assuming this returns session or null

export async function middleware(request) {
  const session = await auth(); // fetch your session data here

  const isAuth = !!session;
  const isLoginPage = request.nextUrl.pathname === "/Login";

  if (!isAuth && !isLoginPage) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/"], // apply middleware to root and dashboard routes
};
