import { NextResponse } from "next/server";
import showToast from "./utils/toastService";
import { getToken } from "next-auth/jwt";

export const config = {
  //   matcher: ["/dashboard/:path*", "/sign-in", "/sign-up", "/", "/verify/:path*"],
  matcher: [
    "/forgotPassword",
    "/login",
    "/register",
    "/verify-email",
    "/playlist/:path*",
    "/profile",
    "/watch/:path*",
  ],
};

// eslint-disable-next-line no-undef
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request) {
  const token = await getToken({ req: request, secret });
  const url = request.nextUrl;

  // Redirect to dashboard if the user is already authenticated
  // and trying to access sign-in, sign-up, or home page
  if (
    token &&
    (url.pathname.startsWith("/login") ||
      url.pathname.startsWith("/register") ||
      url.pathname.startsWith("/forgotPassword"))
  ) {
    showToast("You Are already logged in", "info");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // if (!token && url.pathname.startsWith("/playlist")) {
  //   showToast("Login to create your playlist", "info");
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}
