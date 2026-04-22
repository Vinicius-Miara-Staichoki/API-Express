import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Car from "./Car.js";
import User from "./User.js";
import Sale from "./Sale.js";


dotenv.config();
const app = express();
const PORT = 3000;
app.use(express.json());
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected with MONGODB");

    } catch (error) {
        console.log("Error: ", error);

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
        const carByBrand = await Car.find({ brand: req.params.brand });
        res.json({ carByBrand })
    } catch (error) {
        res.json({ error: error.message })
    }

})

app.get("/cars/available/yes", async (req, res) => {
    try {
        const carAvailable = await Car.find({ available: "Yes" });
        res.json({ carAvailable })


    } catch (error) {
        res.json({ error: error.message })
    }

})

app.patch("/cars/:id/availability", async (req, res) => {
    try {
        const carUpdated = await Car.findByIdAndUpdate(

            req.params.id,
            { available: req.body.available },
            { new: true }

        );
        res.json(carUpdated)

    } catch (error) {
        res.json({ error: error.message })


    }

})

app.get("/cars/price/:min/:max", async (req, res) => {
    try {
        const carByPrice = await Car.find({ price: { $gte: Number(req.params.min), $lte: Number(req.params.max) } })
        res.json(carByPrice);
    } catch (error) {
        res.json({ error: error.message })
    }

})

app.get("/cars/plate/:plate", async (req, res) => {
    try {
        const carByPlate = await Car.find({ plate: req.params.plate })
        res.json(carByPlate);
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.get("/cars/available/count", async (req, res) => {
    try {
        const countCarsAvailable = await Car.countDocuments({ available: "Yes" });
        res.json(countCarsAvailable);

    } catch (error) {
        res.json({ error: error.message })
    }
})

app.post("/users", async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        res.json({ newUser })
    } catch (error) {
        res.json({ error: error.message })
    }

})

app.get("/users", async (req, res) => {
    try {
        const listUsers = await User.find();
        res.json({ listUsers });
    } catch (error) {
        res.json({ eror: error.message });
    }

}

)

app.get("/users/:id", async (req, res) => {
    try {
        const UserById = await User.findById(req.params.id)
        res.json({ UserById })
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.put("/users/:id", async (req, res) => {
    try {
        const userUpdated = await User.findByIdAndUpdate(
            req.params.id,
            req.body
        )
        res.json(userUpdated)
    } catch (error) {
        res.json({ error: error.message })
    }

})

app.delete("/users/:id", async (req, res) => {
    try {
        const userDeleted = await User.findByIdAndDelete(req.params.id)
        res.json({ userDeleted })
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.get("/users/email/:email", async (req, res) => {
    try {
        const userByEmail = await User.find({ email: req.params.email })
        res.json({ userByEmail })
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.get("/users/count/countUsers", async (req, res) => {
    try {
        const countUsers = await User.countDocuments({ User })
        res.json({ countUsers })
    } catch (error) {
        res.json({ error: error.message })
    }

})

app.patch("/users/:id/name", async (req, res) => {
    try {
        const userUpdatedName = await User.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true }

        );
        res.json({ userUpdatedName })
    } catch (error) {
        res.json({ error: error.message })
    }

})

app.get("/users/exists/:email", async (req, res) => {
    try {
        const existsEmail = await User.findOne({ email: req.params.email })
        res.json({ exists: !!existsEmail })
    } catch (error) {
        res.json({ error: error.nmessage })

    }

})

app.get("/users/search/:name", async (req, res) => {
    try {
        const existsName = await User.findOne({ name: req.params.name })
        res.json({ exists: !!existsName })
    } catch (error) {
        res.json({ error: error.message })
    }

})

app.delete("/users", async (req, res) => {
    try {
        const usersDeleted = await User.deleteMany({})
        res.json({ usersDeleted })
    } catch (error) {
        res.json({ error: error.message })
    }

})


app.post("/sales", async (req, res) => {
    try {
        const sale = await Sale.create(req.body)
        res.json({ sale })
    } catch (error) {
        res.json({ error: error.message })
    }


})

app.get("/sales", async (req, res) => {
    try {
        const listSales = await Sale.find({ Sale })
        res.json({ listSales })
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.get("/sales/:id", async (req, res) => {
    try {
        const saleByID = await Sale.findById(req.params.id)
        res.json(saleByID)
    } catch (error) {
        res.json({ error: error.message })
    }

})

app.put("/sales/:id", async (req, res) => {
    try {
        const updatedSales = await Sale.findByIdAndUpdate(
            req.params.id,
            req.body
        )
        res.json({ updatedSales })
    } catch (error) {
        res.json({ error: error.message })
    }

})

app.delete("/sales/:id", async (req, res) => {
    try {
        const deleteSale = await Sale.findByIdAndDelete(req.params.id)
        res.json({ deleteSale })
    } catch (error) {
        res.json({ error: error.message })
    }

})

app.get("/sales/user/:userID", async (req, res) => {
    try {
        const salesByUser = await Sale.find({ userID: req.params.userID })
        res.json({ salesByUser })
    } catch (error) {
        res.json({ error: error.message })
    }

})

app.get("/sales/car/:carID", async (req, res) => {
    try {
        const salesByCar = await Sale.find({ carID: req.params.carID })
        res.json({ salesByCar })
    } catch (error) {
        res.json({ error: error.message })
    }

})

app.patch("/sales/:id/status", async (req, res) => {
    try {
        const updatedStatus = await Sale.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        )
        res.json({ updatedStatus })
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.get("/sales/value/:min/:max", async (req, res) => {
    try {
        const salesByValue = await Sale.find({ price: { $gte: Number(req.params.min), $lte: Number(req.params.max) } })
        res.json({ salesByValue })
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.get("/sales/date/:date", async (req, res) => {
    try {
        const salesByDate = await Sale.find({ date: req.params.date })
        res.json({ salesByDate })
    }
    catch (error) {
        res.json({ error: error.message })
    }



})

app.get("/sales/count/countSales", async (req, res) => {
    try {
        const countSales = await Sale.countDocuments({ Sale })
        res.json({ countSales })
    } catch (error) {
        res.json({ error: error.message })
    }

})























