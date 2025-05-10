import { Router } from "express";
import ViewController from "../controllers/view.controller.js";
import UserController from "../controllers/user.controller.js";
import { soloAdmin, soloUser } from "../middleware/auth.js";
import { passportCall } from "../utils/utils.js";

const router = Router();

router.get("/login", ViewController.login);
router.get("/register", ViewController.register);
router.get("/profile",passportCall("jwt"), ViewController.profile);
router.get("/current", passportCall("jwt"), UserController.current);
router.get("/products", passportCall("jwt"), soloUser, ViewController.getProducts);
router.get("/realtimeproducts", passportCall("jwt"), soloAdmin, ViewController.realtimeproducts);
router.get("/carts/:cid",passportCall("jwt"),soloUser, ViewController.getCartById);

export default router;
