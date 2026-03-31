import { application } from "express";
import { prisma } from "../lib/db.js"
async function addApplication(req, res) {
    const {id}  = req.user;
    
    const {companyName, companyEmail, position, applicationDate, status} = req.body;

    const userExist = await prisma.user.findUnique({
        where: {id}
    })

    if(!userExist){
        return res.status(404).json({
            message: "User not found!"
        })
    }

    try {
        const newApplication = await prisma.applications.create({
            data: {applier: id, companyName, companyEmail, position, applicationDate: new Date(applicationDate), status} 
        })

        return res.status(201).json({
            message: "Application added successfully!",
            application: newApplication
        })
    } catch (e){
        return res.status(500).json({
            message: e.message
        })
    }

    
}

export {addApplication}