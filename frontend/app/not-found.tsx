import Link from "next/link"
import { FaFrown } from "react-icons/fa"

export default function Notfound(){
    return (
        <div className="absolute top-[50%] left-[50%] -translate-[50%] flex flex-col items-center gap-2 text-gray-500 in-dark:text-white">
                <FaFrown className="text-7xl "/>
                <h1 className="font-bold text-2xl">404</h1>
                <p>The page you&apos;re looking for is not found</p>
                <Link className="bg-gray-400 p-2 rounded-2xl text-white in-dark:bg-white in-dark:text-black hover:scale-110 hover:opacity-70 transition-all duration-300 " href={"/dashboard"}>Return back to dashboard </Link>
        
        </div>
    )
}