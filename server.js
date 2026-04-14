import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Car from "./Car.js";


dotenv.config();
const app = express();
const PORT = 3000;
app.use(express.json());
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado com o MONGODB");

    } catch (error) {
        console.log("Erro: ", error);

    }

}
connectDB();
app.post("/cars", async (req, res) => {
    try {
        const newCar = await Car.create(req.body);
        res.json(newCar);




    } catch (error) {
        res.json({ error: error.message })

    }


})

app.get("/cars", async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars)
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.put("/cars/:id", async (req, res) => {
    try {
        const carUpdated = await Car.findByIdAndUpdate(
            req.params.id,
            req.body
        )
        res.json(carUpdated);
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.delete("/cars/:id", async (req, res) => {
    try {
        const carDeleted = await Car.findByIdAndDelete(req.params.id);
        res.json(carDeleted)
    } catch (error) {
        res.json({ error: error.message });
    }
})

app.get("/cars/:id", async (req, res) => {
    try {
        const carById = await Car.findById(req.params.id);
        res.json(carById)
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.listen(PORT, () =>
    console.log("O servidor está rodando na porta: ", PORT)
);

app.get("/cars/brand/:brand", async (req, res) => {
    try {
        const carByBrand= await Car.findOne({ brand: req.params.brand });
        res.json({ carByBrand})
    } catch (error) {
    res.json({ error: error.message })
}

})

app.get("/cars/available",async (req,res)=>{
    try{
        const carAvailable = await Car.findOne({available: req.params.available});

    } catch(error){
        res.json({error: error.message})
    }

})


