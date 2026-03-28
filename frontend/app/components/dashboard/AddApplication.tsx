'use client';

import { useState } from "react";
import Motion from "../Animation";

import { FaX } from "react-icons/fa6";

export default function AddApplicationBtn(){
    const [isAdding, setIsAdding] = useState(false);

    const showPanel = () => {
        setIsAdding(true)
    }

    const hidePanel = () => {
        setIsAdding(false)
    }

    return (
    <>
        <button onClick={showPanel} className="bg-slate-950 text-white in-dark:bg-white in-dark:text-black p-3 rounded-xl text-center w-[250px] sm:scale-100 scale-80">+ Add application</button>
{isAdding && 
            <Motion className="fixed left-[50%] top-[50%] -translate-[50%] border p-10 rounded-2xl " initial={{scale: "0%"}} animate={{scale: "100%"}}>
                <div>
                    <input className="outline-black" type="text" placeholder="Company name"/>
                    <input className="outline-black" type="email" placeholder="Company email"/>
                    <div>
                        <label htmlFor="">Application date: </label>
                        <input className="outline-black" type="date" />
                    </div>

                    <button onClick={hidePanel} className="opacity-20 hover:opacity-100 absolute top-3 right-3"><FaX/></button>
                </div>
            </Motion>
        }
    </>
    )
}