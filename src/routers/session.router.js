import { Router } from "express";
import SessionController from "../controllers/session.controller.js";
import { authorization, passportCall } from "../utils/utils.js";

const router = Router();

router.post("/api/sessions/register", SessionController.register)
router.post("/api/sessions/login", SessionController.login)
router.post("/api/sessions/logout", SessionController.logout)
router.get("/current", passportCall("jwt"),authorization("user"), SessionController.current)



export default router;
