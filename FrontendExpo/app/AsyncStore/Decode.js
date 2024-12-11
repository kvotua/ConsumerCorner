// import jwt from 'jsonwebtoken';

// export const decodeJwt = (token) => {
//     try {
//         const decoded = jwt.decode(token);
//         console.log("Decoded JWT:", decoded);
//         return decoded;
//     } catch (error) {
//         console.error("Failed to decode JWT:", error);
//         return null;
//     }
// };
import { Buffer } from "buffer";

export const decodeJwt = (token) =>{
    try {
        const parts = token.split(".").map(part => Buffer.from(part.replace(/-/g, '+').replace(/-/g, '/'), 'base64').toString());
        const payload = JSON.parse(parts[1]);
        console.log(payload);
        return payload;
    } catch (error) {
        console.log("lox");
    }
}