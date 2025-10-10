import express from "express"
import cors from "cors";
import dotenv from "dotenv"
import mysql from "mysql2"

dotenv.config();

const app = express()
app.use(cors())
app.use(express.json());

//MySQL CONNECTION

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

db.connect(err => {
    if (err) throw err;
    console.log("MySQL connected");
})

app.get("/", (req, res) => res.send("Metro API running..."));

app.listen(5000, () => console.log("server running on port 5000"))