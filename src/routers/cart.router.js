import { Router } from "express";
import CartController from "../controllers/cart.controller.js";
import {passportCall} from "../utils/utils.js"


const router = Router();

router.post("/api/carts", CartController.createCart)
router.get("/api/carts", CartController.getCarts)
router.get("/api/carts/:cid", CartController.getCartById)
router.delete("/api/cart/:cid", CartController.emptyCart)
router.delete("/api/carts/:cid", CartController.deleteProductFromCart)
router.put("/api/carts/:cid", CartController.addProductToCart)
router.post("/api/carts/:cid/purchase",passportCall("jwt") ,CartController.finalizePurchase)

export default router;
