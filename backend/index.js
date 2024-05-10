import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import router from "./routes/tasksRoute.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("test!");
});

app.use("/tasks", router);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
