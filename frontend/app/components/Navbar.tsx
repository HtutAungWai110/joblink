'use client';

import { FaComputer } from "react-icons/fa6";
import ThemeToggle from "./themeBtn";
import { usePathname } from "next/navigation";
import SignoutBtn from "./SignoutBtn";


export default function Navbar(){

    const pathname = usePathname();

    return (
        <div className=" flex justify-between items-center bg-black in-dark:bg-white text-white in-dark:text-black p-2 rounded-[50px] m-2 shadow-gray-900 in-dark:shadow-[10px_10px_10px]">
            <div className="p-[5px_20px] border rounded-[50px] bg-white in-dark:bg-slate-950">
                <h1 className="sm:text-[2em] text-[1em] text-shadow-sm font-[600] text-black in-dark:text-white">
                    Joblink
                </h1>
            </div>

            <ul className="flex gap-2">
                <li className={`nav_items ${pathname === "/dashboard" ? "bg-white in-dark:bg-black text-black in-dark:text-white" : "**:"}`}
                >Dashboard <FaComputer/></li>

                <li className="nav_items"><SignoutBtn/></li>

                <li className="nav_items p-3"><ThemeToggle/></li>

            </ul>
        </div>
    )
}