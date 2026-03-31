'use client';

import { useState, useRef, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Motion from "../Animation";

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

    const { register, handleSubmit, formState: {errors}, getValues } = useForm<inputs>()

    const boxRef = useRef<HTMLDivElement>(null)

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
        
            <Motion ref={boxRef} className="fixed left-[50%] top-[50%] -translate-[50%] border p-[50px_25px] rounded-2xl w-[90%] sm:w-[700px]" initial={{scale: "0%"}} animate={{scale: "100%"}}>
                <form onSubmit={handleSubmit(onAdd)} className="grid grid-cols-2 gap-2">
                    <input className="outline-black border rounded-[10px] h-[40px]" type="text" placeholder="Company name" {...register("companyName", {
                        required: "Company name is required!",
                    }) }/>
                    <input className="outline-black border rounded-[10px] h-[40px]" type="text" placeholder="Company email" {...register("companyEmail", {
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Enter valid email!"
                        }
                    })}/>

                    <input className="outline-black border rounded-[10px] h-[40px]" type="text" placeholder="position" {...register("position")}/>
                    <div  className="mr-1">
                        <label htmlFor="">Application date: </label>
                        <input className="outline-black border rounded-[10px] p-1" type="date" {...register("applicationDate", {
                            required: "Add application date!"
                        }) }/>
                    </div>
                        <Combobox items={statusArray}>
                            <ComboboxInput placeholder="Status" {...register("status", {
                                required: "Add status!"
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
                </form>
            </Motion>
       
        }
    </>
    )
}