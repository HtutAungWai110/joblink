import { prisma } from "../lib/db.js";
import bcrypt from "bcryptjs";
import z from "zod"

import { generateAccessToken, generateRefreshToken } from "../lib/TokenGenerator.js";

const registerSchema = z.object({
    username: z.string(),
    email: z.email(),
    password: z.string()


})

const loginSchema = z.object({
    email: z.email(),
    password: z.string()
})

async function register (req, res){
    const {username, email, password} = req.body;

    if(!registerSchema.parse({username, email, password})){
        return res.status(400).json({
            message: "Validation error"
        });
    }


    const userExist = await prisma.user.findUnique({
        where: {email: email}
    });

    if (userExist){
        return res.status(500).json({
            message: "User already exist with this email"
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
        data: {
            username: username,
            email: email,
            password: hashedPassword
        }
    })

    return res.status(200).json({
        messsage: "Success",
        data: user
    })

   
}

async function login (req, res){
    const {email, password} = req.body;

    if(!loginSchema.parse({email, password})){
        return res.status(400).json({
            message: "Validation error"
        });
    }
    
    const user = await prisma.user.findUnique({
        where: {email: email}
    })

    if(!user){
        return res.status(404).json({
            message: "Invalid email or password"
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid){
        return res.status(404).json({
            message: "Invalid email or password"
        });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    return res.status(200).json({
        accessToken,
        refreshToken
    })


}

export {register, login};