import jwt from "jsonwebtoken";
import configObject from "../config/config.js";



const private_key = configObject.private_key;

export const generateToken = (user) => {
    const token = jwt.sign(user, private_key, { expiresIn: "24h" });
    return token;
};

