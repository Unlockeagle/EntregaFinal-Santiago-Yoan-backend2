import { Router } from "express";
import ProductController from "../controllers/product.controller.js";

const router = Router();

const productController = new ProductController()

router.post("/api/products", productController.createProduct)
router.get("/api/products", productController.getProducts)
router.get("/api/products/:id", productController.getProductsById)
router.delete("/api/products/:id", productController.deleteProduct)
router.put("/api/products/:id", productController.updateProduct)

export default router;
