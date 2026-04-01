import { NextRequest, NextResponse } from "next/server";
import { proxyFetch } from "@/lib/proxyFetch";

export async function POST(req: NextRequest, res: NextResponse){
    const { companyName, companyEmail, position, applicationDate, status } = await req.json()


    const response = await proxyFetch(`${process.env.API_URL}/application/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ companyName, companyEmail, position, applicationDate, status })
    })

    if(!response.ok){
        const error = await response.json();
        return NextResponse.json({ message: error.message }, { status: response.status })
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 })

}

export async function GET(req: NextRequest, res: NextResponse){
    const response = await proxyFetch(`${process.env.API_URL}/application/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if(!response.ok){
        const error = await response.json();
        return NextResponse.json({ message: error.message }, { status: response.status })
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 })

}
