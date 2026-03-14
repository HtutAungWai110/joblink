import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


const AUTH_PATHS = ["/dashboard"]
const PUBLIC_PATHS = ["/", "/signin", "signup"] 

export default async function middleware(req: NextRequest){


    const {pathname} = req.nextUrl;

    const isPublicPath = PUBLIC_PATHS.includes(pathname);
    const isAuthPath = AUTH_PATHS.includes(pathname);

    const cookieStore = await cookies();

    const accessToken = cookieStore.get("access_token")?.value;
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (isAuthPath && !accessToken && !refreshToken){
        return NextResponse.redirect(new URL('/signin', req.url))
    }


    if (isPublicPath && refreshToken){
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }


    

    
    if(!accessToken){
        

        if(refreshToken){
            const refreshResponse = await fetch(`${process.env.API_URL}/token/refresh`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({refreshToken})
            })


            if (refreshResponse.ok){
                const {accessToken} = await refreshResponse.json();

                const response = NextResponse.next();

                response.cookies.set("access_token", accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', // Only secure in prod
                    sameSite: "strict",
                    path: "/",
                    maxAge: 60 * 15 // 15 minutes
                });

                return response;

               

            }
        }
    } 

}