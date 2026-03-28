'use client'
import { FaDoorOpen } from "react-icons/fa6"
import { useRouter } from "next/navigation"

export default function SignoutBtn(){
    const router = useRouter();

    async function onSignOut(){
        const res = await fetch("api/signout", {method: "POST"});
        if (!res.ok){
            const error = await res.json();
            console.error(error.message);
            return;
        }

        router.push("/signin")
    }

    return (
       <button onClick={onSignOut} className="flex justify-center items-center">Logout <FaDoorOpen/></button>
    )
}