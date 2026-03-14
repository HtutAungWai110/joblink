'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { FaExclamationTriangle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import Motion from "../Animation";


type Inputs = {
    email: string
    password: string
}

export default function SigninForm () {
    const { register, handleSubmit, formState: {errors}, getValues } = useForm<Inputs>()
    const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();
  
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setError(null)
        }, 3000)

        return () => clearTimeout(timeoutId)
    }, [error])

    const loginMutation = useMutation({
        mutationFn: async (formData: Inputs) => {
            setLoading(true)
            const res = await fetch("api/signin", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(formData)
            })

            if(!res.ok){
                const e = await res.json();
                throw new Error(e.message)
            }

            const data = await res.json();
            return data
        },
        onError: (e) => {
            console.error(e.message)
            setError(e.message)
            setLoading(false)
        },
        onSuccess: (data) => {
            console.log(data);

            setTimeout(() => {
                router.push("/dashboard")
            }, 2000)
            
        }
    })




    const onSubmit: SubmitHandler<Inputs> = (formData: Inputs) => {
        loginMutation.mutate(formData);
    }

    return (
        <>
        {error && 
            <Motion
            className="
            flex justify-center items-center gap-2 w-[400px] z-50
            absolute top-[70%] left-[50%] -translate-[50%] border
             rounded-2xl p-2 text-red-500 in-dark:text-red-300 
             bg-white in-dark:bg-gray-800 in-dark:border-cyan-200"
            initial={{opacity: 0}} animate={{opacity: 80}} transition={{duration: 0.5}}
            >
                <FaExclamationTriangle></FaExclamationTriangle>
                <p>{error}</p>
                
            </Motion>
        }
        
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
           
            <input className="border-b border-b-gray-400 p-[10px_0px] outline-none in-dark:border-b-cyan-200" placeholder="Email" type="email" {...register("email", {
                required: "Email is required",
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email"
                }
            })}/>
            <div className="h-[20px] text-red-500 flex items-center in-dark:text-red-300">
                {errors.email && <p className="text-[0.8em]">*{errors.email.message}*</p>}
            </div>
            <div className="relative w-full">
                <input className="w-full border-b border-b-gray-400 p-[10px_0px] outline-none in-dark:border-b-cyan-200" placeholder="Password" 
                type={passwordHidden ? "password" : "text"} {...register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long"
                    },
                    pattern: {
                        value: /(?=.*\d)/,
                        message: "Password must contain at least one number"
                    }
                })}/>

                <button onClick={() => setPasswordHidden(prev => !prev)} type="button" 
                className="absolute right-0 top-[50%] -translate-[50%] text-gray-500">
                    {passwordHidden ? <FaEyeSlash/> : <FaEye/>}
                </button>
            </div>
            <div className="h-[20px] text-red-500 flex items-center in-dark:text-red-300">
                {errors.password && <p className="text-[0.8em]">*{errors.password.message}*</p>}
            </div>
            
            <button type="reset" className="rounded-[5px] p-2">Clear all</button>
            <button disabled={loading} type="submit" className={`${loading ? "bg-white text-black border border-black" : "bg-cyan-500"} gap-2 rounded-[5px] p-2 mt-2 flex items-center justify-center`}>
                Sign in
                {loading ? <Spinner/> : ""}
                
            </button>
            
            
        </form>

        </>
    )
}