import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

interface Payload {
  email: string;
  role: string;
}

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || "";

// fonction utilisé à chaque appel du middleware (qd on va sur une page)
export default async function middleware(request: NextRequest) {
  const { cookies } = request;
  const token = cookies.get("token");
  return await checkToken(token?.value, request);
}

export async function verify(token: string): Promise<Payload> {
  const { payload } = await jwtVerify<Payload>(
    token,
    new TextEncoder().encode(JWT_PRIVATE_KEY)
  );
  return payload;
}

async function checkToken(token: string | undefined, request: NextRequest) {
  let response: NextResponse<unknown>;
  // si token undefined
  if (!token) {
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      response = NextResponse.redirect(new URL("/auth/login", request.url));
    } else {
      response = NextResponse.next();
      // response = NextResponse.redirect(new URL("/", request.url));
    }
    response.cookies.delete("email");
    response.cookies.delete("role");
    return response;
  }

  try {
    const payload = await verify(token);

    if (payload.email) {
      response = NextResponse.next();

      if (request.nextUrl.pathname.startsWith("/auth")) {
        response = NextResponse.redirect(new URL("/", request.url));
      }

      if (request.nextUrl.pathname.startsWith("/admin")) {
        if (payload.role !== "ADMIN") {
          response = NextResponse.redirect(new URL("/400", request.url));
        }
      }

      response.cookies.set("email", payload.email);
      response.cookies.set("role", payload.role);
      return response;
    }
    return NextResponse.redirect(new URL("/", request.url));
  } catch (err) {
    if (request.nextUrl.pathname.startsWith("/")) {
      response = NextResponse.next();
    } else {
      response = NextResponse.redirect(new URL("/", request.url));
    }
    return response;
  }
}
