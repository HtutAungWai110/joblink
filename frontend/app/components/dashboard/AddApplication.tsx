'use client';

import { useState, useRef, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Motion from "../Animation";
import { getQueryClient } from "@/app/lib/QueryClient";

import { FaX } from "react-icons/fa6";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { data } from "motion/react-client";

type inputs = {
    companyName : string
    companyEmail: string
    position: string
    applicationDate: Date
    status: string
}

export default function AddApplicationBtn(){
    const [isShown, setIsShown] = useState(false);

    const { register, handleSubmit, formState: {errors}, reset } = useForm<inputs>()

    const boxRef = useRef<HTMLDivElement>(null)

    const queryClient = getQueryClient()

    const addApplicationMutation = useMutation({
        mutationFn: async (formData: inputs) => {
            const response = await fetch("api/applicationRoute", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            if(!response.ok){
                const error = await response.json();
                throw new Error(error.message || "Something went wrong!")
            }

            const data = await response.json();
            return data;
        },
        onSuccess: (data) => {
            console.log("Application added successfully!", data)
            reset();
            setIsShown(false)
            queryClient.invalidateQueries({ queryKey: ["applications"] })
        },
        onError: (error) => {
            console.error("Error adding application:", error)
        }
    })

    const statusArray = [
        "IN_PROGRESS", "INTERVIEW", "REJECTED"
    ]

    const showPanel = () => {
        setIsShown(true)
    }

    const hidePanel = () => {
        setIsShown(false)
    }

    const onAdd: SubmitHandler<inputs> = (formData: inputs) => {
        addApplicationMutation.mutate(formData)
    }

   

    const handleClickOutside = (e: MouseEvent) => {
        if(boxRef.current){
            if(!boxRef.current.contains(e.target as Node)){
                setIsShown(false)
            }
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown",handleClickOutside)

        return() =>  document.removeEventListener("mousedown",handleClickOutside)
    }, [])

    return (
    <>
        <button onClick={showPanel} className="bg-slate-950 text-white in-dark:bg-white in-dark:text-black p-3 rounded-xl text-center w-[250px] sm:scale-100 scale-80">+ Add application</button>
        {isShown && 
        
            <Motion ref={boxRef} className="fixed left-[50%] top-[50%] -translate-[50%] border-2 shadow-2xl in-dark:shadow-gray-900 p-[50px_25px] rounded-2xl w-[90%] sm:w-[700px] bg-white in-dark:bg-gray-900" initial={{scale: "0%"}} animate={{scale: "100%"}}>
                <form onSubmit={handleSubmit(onAdd)} className="grid grid-cols-2 gap-2">
                   
                    
                    <input className="outline-black border rounded-[10px] h-[40px] p-2" type="text" placeholder="Company name" {...register("companyName", {
                        required: "Enter company name",
                    }) }/>

                    
                    
                    
                    
                    <input className="outline-black border rounded-[10px] h-[40px] p-2" type="text" placeholder="Company email" {...register("companyEmail", {
                        required: "Enter company email",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Enter valid email"
                        }
                    })}/>
                    
                    
                    <div>
                        {errors.companyName && <p className="text-red-400">{errors.companyName.message}</p>}
                        
                    </div>

                    <div>
                        {errors.companyEmail && <p className="text-red-400">{errors.companyEmail.message}</p>}
                    </div>

                    
                    <input className="outline-black border rounded-[10px] h-[40px] p-2" type="text" placeholder="position" {...register("position", {
                        required: "Enter position"
                    })}/>
                    <div  className="mr-1">
                        <label htmlFor="">Application date: </label>
                        <input className="outline-black border rounded-[10px] p-1" type="date" {...register("applicationDate", {
                            required: "Add application date!"
                        }) }/>
                    </div>

                    <div>
                        {errors.position && <p className="text-red-400">{errors.position.message}</p>}
                    </div>

                    <div>
                        {errors.applicationDate && <p className="text-red-400">{errors.applicationDate.message}</p>}
                    </div>
                    
                    <Combobox items={statusArray}>
                        <ComboboxInput className={"outline-red-500"} placeholder="Status" {...register("status", {
                            required: true
                        })} readOnly/>
                        <ComboboxContent>
                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                            <ComboboxList>
                            {(item) => (
                                <ComboboxItem key={item} value={item}>
                                {item}
                                </ComboboxItem>
                            )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>

                  
                    

                    <button onClick={hidePanel} type="button" className="opacity-20 hover:opacity-100 absolute top-3 right-3"><FaX/></button>
                    <button type="submit" className="bg-black text-white in-dark:bg-white in-dark:text-black rounded-[10px] p-1 w-[100px]">Add</button>
                      <div>
                        {errors.status && <p className="text-red-400">{errors.status.message}</p>}
                    </div>
                </form>
            </Motion>
       
        }
    </>
    )
}