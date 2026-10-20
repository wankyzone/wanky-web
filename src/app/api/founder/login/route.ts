import { NextRequest, NextResponse } from "next/server";
import { createFounderSession, founderCookieMaxAge, founderCookieName } from "@/lib/founder-auth";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
 const password = process.env.ADMIN_PASSWORD;
 if (!password || !process.env.ADMIN_SESSION_SECRET) return NextResponse.json({error:"Founder access is not configured."},{status:503});
 if (Number(request.headers.get("content-length")||"0") > 2000) return NextResponse.json({error:"Invalid request."},{status:413});
 let body: {password?:unknown}; try {body=await request.json();} catch {return NextResponse.json({error:"Invalid request."},{status:400});}
 if(typeof body.password!=="string" || body.password.length>500 || body.password!==password) return NextResponse.json({error:"The password was not accepted."},{status:401});
 const response=NextResponse.json({ok:true}); response.cookies.set(founderCookieName,createFounderSession(),{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/",maxAge:founderCookieMaxAge}); return response;
}
