//Funcion que verifica si el usuario es admin

const soloAdmin = (req, res, next) => {
    console.log(req.user.role)
    if (req.user.role === "admin") {
        next();
    } else {
        res.status(403).send("Acceso denegado, Pa` donde vas pajarito!!");
    }
};

const soloUser = (req, res, next) => {
    if (req.user.role === "user") {
        next();
    } else {
        res.status(403).send("Acceso denegado, Perteneces a un lugar mejor!!");
    }
};

export { soloAdmin, soloUser };
