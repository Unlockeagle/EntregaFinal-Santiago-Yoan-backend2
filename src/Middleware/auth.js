// //Funcion que verifica si el usuario es admin

// const soloAdmin = (req, res, next) => {
//     console.log(req.user.role)
//     if (req.user.role === "admin") {
//         next();
//     } else {
//         res.status(403).send("Acceso denegado, Pa` donde vas pajarito!!");
//     }
    
// };

// const soloUser = (req, res, next) => {
//     if (req.user.role === "user") {
//         next();
//     } else {
//         res.status(403).send("Acceso denegado, Perteneces a un lugar mejor!!");
//     }
// };

// export { soloAdmin, soloUser };

// Función que verifica si el usuario es admin
const soloAdmin = (req, res, next) => {
    // Verifica que req.user exista y tenga el rol
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ error: "Acceso denegado, Pa` donde vas pajarito!!" });
    }
    next();
};

// Función que verifica si el usuario es un usuario normal
const soloUser = (req, res, next) => {
    // Verifica que req.user exista y tenga el rol
    if (!req.user || req.user.role !== "user") {
        return res.status(403).json({ error: "Acceso denegado, Perteneces a un lugar mejor!!" });
    }
    next();
};

export { soloAdmin, soloUser };
