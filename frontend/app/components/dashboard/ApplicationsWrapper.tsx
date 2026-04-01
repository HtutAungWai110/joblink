'use client'

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import ApplicationCard from "./ApplicationCard";
import { ApplicationType } from "@/app/types/types";

export default function ApplicationsWrapper(){

    const {data, isLoading, error } = useQuery({
        queryKey: ["applications"],
        queryFn: async () => {
        const res = await fetch("api/applicationRoute");
        

        const data = await res.json();
        return data;
        },
    })

    useEffect(() => {
        console.log("Applications data:", data)
    }, [data])


    return (
        <div className="w-[90%] m-auto flex flex-col gap-2">
            {data?.applications?.sort((a: ApplicationType, b: ApplicationType) => {
                const bdate = new Date(b.lastUpdated)
                const adate = new Date(a.lastUpdated)
                return adate.getTime() - bdate.getTime()
            }).map((app: ApplicationType, index: number) => {
                return <ApplicationCard key={index} application={app}/>
            })}
        </div>
    )
}