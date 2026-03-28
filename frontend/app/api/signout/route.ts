import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest, res: NextResponse) => {
    const cookieStore = await cookies();

    try{
        cookieStore.set("access_token", '', {
            httpOnly: true,
            expires: new Date(0),
            path: "/"
        })

         cookieStore.set("refresh_token", '', {
            httpOnly: true,
            expires: new Date(0),
            path: "/"
        })

        return NextResponse.json({
            message: "Signout successfully!"
        })
    } catch(e){
        return NextResponse.json({
            message: "An error occur!"
        }, {status: 500})
    }
}