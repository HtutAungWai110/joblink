import express from "express";
import {config} from "dotenv";
import authRoutes from "./routes/auth.js"

const app = express();
app.use(express.json());
config();

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    return res.json({
        message: "Hello"
    })
})

const port = 3001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})