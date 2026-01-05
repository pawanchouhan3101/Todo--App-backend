const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Routes
const todoRoute = require("./route/route");
const authRoute = require("./route/auth.route");

const PORT = process.env.PORT || 4000;



const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://todo-app-pawan.vercel.app" // your Vercel frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests without origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

//  Handle preflight requests
app.options("*", cors());


app.use(express.json());



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error(" MongoDB error:", err));


app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use("/api/todo", todoRoute);
app.use("/api/auth", authRoute);



app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
