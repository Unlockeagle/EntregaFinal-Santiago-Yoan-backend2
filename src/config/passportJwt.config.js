import passport from "passport";
import jwt from "passport-jwt";
import configObject from "./config.js";

const JWTStrategy = jwt.Strategy;
const ExtracJwt = jwt.ExtractJwt;

const initializePassport = () => {
    passport.use(
        "jwt",
        new JWTStrategy(
            {
                jwtFromRequest: ExtracJwt.fromExtractors([cookieExtractor]),
                secretOrKey: configObject.secretOrKey
            },
            async (jwt_payload, done) => {
                try {
                    return done(null, jwt_payload);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
};



const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["coderCookieToken"]; 
    }
    return token;
};

export default initializePassport;
