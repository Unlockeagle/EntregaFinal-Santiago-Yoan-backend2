import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    counter: {
        type: Number,
    },
});

const CounterModel = mongoose.model("counters", CounterSchema);
export default CounterModel;
