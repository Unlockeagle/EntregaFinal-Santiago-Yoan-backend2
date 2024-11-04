import CartService from "../services/cart.service.js";
import ProductService from "../services/product.service.js";

class ViewController {
    async register(req, res) {
        if (req.user) {
            console.log(req.user);
            return res.redirect("/profile");
        }
        res.render("register");
    }
    async login(req, res) {
        if (req.user) {
            return res.redirect("/profile");
        }
        res.render("login");
    }
    async profile(req, res) {
        if (!req.user) {
            return res.redirect("/login");
        }

        res.render("profile", { user: req.user });
    }
    async realtimeproducts(req, res) {
        return res.render("realtimeproducts");
    }
    async getProducts(req, res) {
        const query = req.query;

        const products = await ProductService.getProducts(query);
        const plainProducts = products.docs.map((product) => {
            const { ...rest } = product.toObject();
            return rest;
        });
        let category = req.query.category ? `&category=${req.query.category}` : "";
        res.render("products", {
            products: plainProducts,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            currentPage: products.page,
            totalPage: products.totalPages,
            prevLink: products.hasPrevPage ? `/products?page=${products.prevPage}${category}` : "",
            nextLink: products.hasNextPage ? `/products?page=${products.nextPage}${category}` : "",
        });
    }
    async getCartById(req, res) {
        try {
            const cid = req.params.cid;
            const cart = await CartService.findCartById(cid);

            res.render("cart", { cart: cart });
        } catch (error) {
            res.status(401).send({ message: "Error al obtener carrito en el servidor", error: error.message });
        }
    }
    async current(req, res) {
        if (req.user) {
            const user = req.user;
            if (user.role === "user") {
                res.render("profile", { user });
            } else if (user.role === "admin") {
                res.render("realtimeproducts", { user });
            } else {
                res.send("No autorizado por el currrents");
            }
        }
    }
}

export default new ViewController();
