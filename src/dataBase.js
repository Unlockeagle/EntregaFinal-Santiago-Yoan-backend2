import mongoose from "mongoose";
import configObject from "./config/config.js";

// aplical sigleton
const connection = async () => {
    try {
        const db = await mongoose.connect(configObject.mongoUrl);
        console.log("Conectado a la DB 🍃");
        return db;
    } catch (error) {
        throw new Error("Error al connectar DB 😟");
        
    }
};

connection();
