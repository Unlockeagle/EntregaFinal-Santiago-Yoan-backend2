import SessionService from "../services/session.service.js";
import { generateToken } from "../utils/jsonwebtoken.js";

class SessionController {
    async register(req, res) {
        try {
            const userData = req.body;
            const user = await SessionService.register(userData);
            const token = generateToken({
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
            });
            res.cookie("coderCookieToken", token, {
                maxAge: 3600000,
                httpOnly: true,
            }).redirect("/current");
            //res.send({ message: "Usuario registrado exitosamente", user: user, token: token });
        } catch (error) {
            res.send({ message: "Error al registar usuario", error: error.message });
        }
    }
    async login(req, res) {
        const { email, password } = req.body;

        const user = await SessionService.login(email, password);
        const token = generateToken({
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role,
        });
        res.cookie("coderCookieToken", token, {
            maxAge: 3600000,
            httpOnly: true,
        }).redirect("/api/session/current");
        //res.send({ message: "Login exitoso", user: user });
    }
  

    async current(req, res) {
        
        if (req.user) {
            const user = req.user;
            if (user.role === "user") {
                 res.render("profile", { user });
            }else if(user.role === "admin"){
                 res.render("realtimeproducts", {user})
            } else {
                res.send("No autorizado por el currrents");
            }
        }
    }

    async logout(req, res) {
        res.clearCookie("coderCookieToken");
        return res.redirect("/login");
    }
}

export default new SessionController();
