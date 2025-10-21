import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db/connection.js";
import routes from "./routes/route.js";

dotenv.config();

const app = express();
app.use("/api", routes);
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Metro API running..."));

app.listen(5000, () => console.log("server running on port 5000"));
