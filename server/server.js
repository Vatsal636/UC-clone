const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Import Routes
const authRoutes = require("./routes/auth");

// App initialization
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected");
        app.listen(process.env.PORT || 5000, () => {
            console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5000}`);
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
    });
