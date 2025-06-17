import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "@/services/user-me-loader";

export async function middleware(request: NextRequest) {
  const user = await getUserMeLoader();
  const currentPath = request.nextUrl.pathname;

  if (currentPath.startsWith("https://ite4108m.com/")) {
    console.log("THIS");
  }

  if (currentPath.startsWith("https://ite4108m.com/dashboard") && user.ok === false) {
    return NextResponse.redirect(new URL("https://ite4108m.com/", request.url));
  }

  return NextResponse.next();
}