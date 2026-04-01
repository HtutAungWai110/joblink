
import AddApplicationBtn from "@/app/components/dashboard/AddApplication"

import { HydrationBoundary, dehydrate } from "@tanstack/react-query"

import { getQueryClient } from "@/app/lib/QueryClient"

import ApplicationsWrapper from "@/app/components/dashboard/ApplicationsWrapper"
export default async function Dashboard(){
    const queryClient = getQueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["applications"],
        queryFn: async () => {
            const res = await fetch("api/applicationRoute");
            if(!res.ok){
                const error = await res.json();
                throw new Error(error.message || "Something went wrong!")
            }

            const data = await res.json();
            return data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes 
    })

    

    return (
        <>
            <div>
                <div className="m-2 flex justify-center sm:justify-end">
                    <AddApplicationBtn/>
                </div>
                
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <ApplicationsWrapper/>
                </HydrationBoundary>
            </div>
        </>
    )
}