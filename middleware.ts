import { NextRequest, NextResponse } from "next/server";

/**
 * Redirect every `*.vercel.app` hit to the canonical `www.roztomilygroup.com`.
 * The Vercel preview URL is platform-mandatory, but visitors who land there
 * should be bounced to the branded domain. Path + query are preserved.
 *
 * 308 = Permanent Redirect (search engines and browsers cache it).
 */
export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  // Only redirect the canonical production URL — leave preview/branch URLs
  // (which look like roztomily-<hash>-<team>.vercel.app) alone so they
  // can be tested.
  if (host === "roztomily.vercel.app") {
    const url = new URL(req.url);
    url.host = "www.roztomilygroup.com";
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  // Skip static assets so the redirect only catches HTML/document requests.
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|webp|svg|gif|ico|mp4)).*)"],
};
