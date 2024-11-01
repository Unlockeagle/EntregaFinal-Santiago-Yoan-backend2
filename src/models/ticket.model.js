import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        require: true,
    },
    purchase_datetime: {
        type: Date,
        default: Date.now(),
        //timestamps: true, // hora y fecha de la compra
        require: true,
    },
    amount: {
        type: Number, // total de la compra
        require: true,
    },
    purchaser: {
        type: String,
        require: true,
    },
});

const TicketModel = mongoose.model("tickets", TicketSchema);
export default TicketModel;
