import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { authorization, passportCall } from "../utils/utils.js";

const router = Router();

router.post("/api/sessions/register", UserController.register)
router.post("/api/sessions/login", UserController.login)
router.post("/api/sessions/logout", UserController.logout)
router.get("/api/session/current", passportCall("jwt"), UserController.current)



export default router;
