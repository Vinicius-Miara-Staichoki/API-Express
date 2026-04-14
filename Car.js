import mongoose from "mongoose";

const CarSchema = new mongoose.Schema(
    {
        model:String,
        brand:String,
        year:Number,
        color:String,
        price:Number,
        available:String,
      

    },
    { collection: "cars" }
);

export default mongoose.model("Car",CarSchema);



