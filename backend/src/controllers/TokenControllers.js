import jwt from 'jsonwebtoken'
import { generateAccessToken } from '../lib/TokenGenerator.js';

export async function refreshToken(req, res){
    const {refreshToken} = req.body;

    if(!refreshToken){
        return res.status(401).json({
            message: "Refresh token not valid"
        })
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

        const id = {decoded};

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
