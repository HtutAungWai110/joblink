'use client';

import { useRouter } from "next/navigation";


export default function LoginBtn(){
    const router = useRouter();


    return (
        <button onClick={() => router.push("/signin")} className="cursor-pointer w-full">Sign in</button>
    )
}