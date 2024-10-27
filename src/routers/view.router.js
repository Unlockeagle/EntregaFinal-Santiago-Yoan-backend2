import { Router } from "express";
import ViewController from "../controllers/view.controller.js";

const router = Router();

router.get("/login", ViewController.login)
router.get("/register", ViewController.register)
router.get("/profile", ViewController.profile)
router.get("/realtimeproducts", ViewController.realtimeproducts)


export default router;
