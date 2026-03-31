import jwt from 'jsonwebtoken'
import { generateAccessToken } from '../lib/TokenGenerator.js';

export async function refreshToken(req, res){
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        const refreshToken = req.headers.authorization.split(" ")[1];
        try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

        const id = decoded.id;

        const accessToken = generateAccessToken(id);

        return res.status(200).json({
            accessToken
        })

    } catch(e){
        return res.status(500).json({
            message: e.message
        })
    }
    }

    return res.status(500).json({
            message: "No valid token"
        })

    

}
