import jwt from 'jsonwebtoken';

export const decodeJwt = (token) => {
    try {
        const decoded = jwt.decode(token);
        console.log("Decoded JWT:", decoded);
        return decoded;
    } catch (error) {
        console.error("Failed to decode JWT:", error);
        return null;
    }
};