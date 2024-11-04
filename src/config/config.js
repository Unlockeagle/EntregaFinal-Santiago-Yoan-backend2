import dotenv  from "dotenv"

dotenv.config();

const configObject = {
    puerto: process.env.PUERTO,
    mongoUrl: process.env.MONGO_URL,
    private_key: process.env.PRIVATE_KEY,
    secretOrKey: process.env.SECRET_OR_KEY
    // clientId: process.env.CLIENT_ID,
    // clientSecret: process.env.CLIENT_SECERT,
    // callbackUrl: process.env.CALLBACK_URL,
    // secretOrKey: process.env.SECRET_OR_KEY,
    // secret: process.env.SECRET
};

export default configObject;
