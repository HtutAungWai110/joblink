import { ApplicationType } from "@/app/types/types"

export default function ApplicationCard({application}: {application: ApplicationType}){

    const {applicationDate, companyEmail, companyName, id, lastUpdated, position, status} = application;

    const date = new Date(applicationDate)
    
    return (
        <div className="border p-2 rounded-2xl">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold text-gray-500">{companyName}</h2>
                <p className="text-gray-400">Applied on: {date.toLocaleDateString()}</p>
            </div>

            <p>Email: {companyEmail}</p>
            <p>Position: {position}</p>
            <p>Status: {status}</p>
        </div>
    )
}