const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require("./db/connection");
const app = express();

dotenv.config();

// Middleware
app.use(cors({
    origin: [
        "http://localhost:5173",
        process.env.CLIENT_URL
    ].filter(Boolean),
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static("./uploads"));
app.use("/files", express.static("./public/files"));

const PORT = process.env.PORT || 5000;

// DB Connection
connectDB();

// Routes
app.use("/api/users", require("./routes/router"));

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
