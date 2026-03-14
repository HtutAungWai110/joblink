'use client';

import { useRouter } from "next/navigation";


export default function SignupBtn(){
    const router = useRouter();


    return (
        <button onClick={() => router.push("/signup")} className="cursor-pointer w-full">Sing up</button>
    )


}