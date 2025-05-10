import UserService from "../services/user.service.js";
import { generateToken } from "../utils/jsonwebtoken.js";

class UserController {
    async register(req, res) {
        try {
            const userData = req.body;
            const { email } = req.body.email;

            const user = await UserService.register(userData, email);

            const token = generateToken({
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
                email: user.email,
                cartId: user.cartId
            });
            res.cookie("coderCookieToken", token, {
                maxAge: 3600000,
                httpOnly: true,
            }).redirect("/api/session/current");
            //res.send({ message: "Usuario registrado exitosamente", user: user, token: token });
        } catch (error) {
            res.send({ message: "Error al registar usuario ene el servidor", error: error.message });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await UserService.login(email, password);
            if (!user) {
                res.status(403).send({ message: "Error usuario no encontrado" });
            }
            const token = generateToken({
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
                email: user.email,
                cartId: user.cartId
            });
            res.cookie("coderCookieToken", token, {
                maxAge: 3600000,
                httpOnly: true,
            }).redirect("/api/session/current");
            //res.send({ message: "Login exitoso", user: user });
        } catch (error) {
            res.status(500).send({ message: "Error al hacer login en el servidor", error: error.message });
        }
    }

    async current(req, res) {
        if (req.user) {
            const user = req.user;
            if (user.role === "user") {
                res.send({ message: "successful login - type user", user: user });
            } else if (user.role === "admin") {
                res.send({ message: "successful login - type admin", user: user });
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

export default new UserController();
