import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema(
    {
        userID: String,
        carID: String,
        price: Number,
        paymentMethod: String,
        date: Number,
        status: String


    },
    { collection: "sale" }

);

export default mongoose.model("Sale", SaleSchema);
