require("dotenv").config();

require("dns").setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();
const PORT = 8080;

connectDB();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

const reviewRoutes = require("./routes/reviewRoutes");
app.use("/api", reviewRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("AI Code Review Backend is Running!");
});

const errorHandler = require("./middleware/errorHandler");

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
