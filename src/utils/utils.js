import passport from "passport";

const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, (error, user, info) => {
            if(error){
                return next(error)
            }
            if(!user){
                res.status(401).send({
                    error: info.menssage 
                    ? info.message 
                    : info.toString()})
            }
            req.user = user
            next()
        })(req, res, next)
    }
}

const authorization = (role) =>  {
    return async (req, res, next) => {
        if(req.user.role === role){
            return res.render("profile", {user: req.user})
        } else if(req.user.role === "admin"){
            return res.render("realtimeproducts", {user: req.user})
        } else {
            res.status(403).send({message: "no tiene permiso"})
        }
        next()
    }
}

export {
    passportCall, authorization
}