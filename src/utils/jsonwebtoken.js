import jwt from "jsonwebtoken";

const private_key = "coderhouseToken";

export const generateToken = (user) => {
    const token = jwt.sign(user, private_key, { expiresIn: "24h" });
    return token;
};

