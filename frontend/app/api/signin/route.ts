import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest, res: NextResponse){
    return NextResponse.json({
        message: "Hello"
    })

}

export async function POST(req: NextRequest){
    const body = await req.json();
    const res = await fetch(`${process.env.API_URL}/auth/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

     if(!res.ok){
        const data = await res.json();

        return NextResponse.json(data, {
            status: res.status
        })
    }

    const data = await res.json();
    const {accessToken, refreshToken} = data;
    const response = NextResponse.json({
        message: "Sign in success"
    });
    response.cookies.set("access_token", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 15 //15 min
    })
    

    response.cookies.set("refresh_token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7  //15 min
    })

    return response;
}