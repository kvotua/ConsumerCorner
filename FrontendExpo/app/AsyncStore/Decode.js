import { Buffer } from "buffer";

export const decodeJwt = (token) =>{
    try {
        const parts = token.split(".").map(part => Buffer.from(part.replace(/-/g, '+').replace(/-/g, '/'), 'base64').toString());
        const payload = JSON.parse(parts[1]);
        return payload;
    } catch (error) {
        console.log(error.message, 13);
    }
}