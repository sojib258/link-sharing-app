import { NextRequest, NextResponse } from "next/server";
import { TOKEN_NAME } from "./lib/config/constants";
export function middleware(request: NextRequest, res: NextResponse) {
  const token = request.cookies.get(TOKEN_NAME)?.value || "";
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/links", "/preview"],
};
