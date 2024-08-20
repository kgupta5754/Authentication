require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const pollRoutes = require('./routes/poll');
const router=require("./routes/admin")
const profileRoutes = require('./routes/profile');
// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api', pollRoutes);
app.use("/admin",router);
app.use("/pro",profileRoutes);

const port = process.env.PORT ;
app.listen(port, console.log(`Listening on port ${port}...`));
