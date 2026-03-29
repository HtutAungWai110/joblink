import { prisma } from "../lib/db.js"

const authMiddleware = async (req, res, next) => {
    const {email, password} = req.body;

    const user = await prisma.user.findUnique({
        where: {email: email}
    })

    if(user.lockoutUntil &&  user.lockoutUntil > new Date()){
        return res.status(403).json({
            message: `Account temporarily locked! Try again after ${Math.ceil((user.lockoutUntil - new Date()) / (1000 * 60))} minnutes.`
        })
    } else if (user.lockoutUntil && user.lockoutUntil <= new Date()){
        await prisma.user.update({
            where: {email: email},
            data: {
                lockoutUntil: null,
                login_fail_attempts: 0
            }
        })

        
    }

    next();
    

    
}

export {authMiddleware};