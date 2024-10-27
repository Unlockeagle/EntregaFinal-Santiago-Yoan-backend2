import { Router } from "express";
import CartController from "../controllers/cart.controller.js";


const router = Router();

router.post("/api/carts", CartController.createCart)
router.get("/api/carts", CartController.getCarts)
router.get("/api/carts/:cid", CartController.getCartById)
router.delete("/api/carts/:cid", CartController.emptyCart)
//router.delete("/api/carts/:cid", CartController.deleteProductFromCart)
router.put("/api/carts/:cid", CartController.addProductToCart)

export default router;
