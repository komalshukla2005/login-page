const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "https://login-frontend-9g2y6pr49-komalshukla2005s-projects.vercel.app/", credentials: true }));

connectDB();

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
if(process.env.NODE_ENV !== "production"){
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

module.export = app;