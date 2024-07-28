const express = require("express");
const app = express();
const cors = require("cors")
const cookieParser = require('cookie-parser')
require('dotenv').config();
const connectDB = require("./config/db.js");
const router = require("./routes/index.js")

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use("/api", router);

connectDB().then((res) => {
    console.log("connection established")
}).catch((err) => {
    console.log(err);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
