import jwt from "jsonwebtoken";

const generateRefreshToken = (userId) => {
    const payload = {id: userId}
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWTREFRESH_EXPIRES
    })

    return token;
}

const generateAccessToken = (userId) => {
    const payload = {id: userId}
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWTACCESS_EXPIRES
    })

    return token;
}

export {generateAccessToken, generateRefreshToken}