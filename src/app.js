import express from "express";
import configObject from "./config/config.js";
import "../src/dataBase.js";
import ProductRouter from "./routers/product.router.js";
import CartRouter from "./routers/cart.router.js";
import UserRouter from "./routers/user.router.js"
import ViewRouter from "./routers/view.router.js"
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passportJwt.config.js";
import { engine } from "express-handlebars";

const app = express();
const PORT = configObject.puerto || 8080;

// Midleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"))
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());


// Handlebars congfi
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');


// Rutas
app.use("/", ProductRouter);
app.use("/", CartRouter);
app.use("/", UserRouter)
app.use("/", ViewRouter)

// Listen
app.listen(PORT, () => {
    console.log(`Server on port: \nhttp://localhost:${PORT} 🚀`);
});
