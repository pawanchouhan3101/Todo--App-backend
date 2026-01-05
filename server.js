const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors")
dotenv.config();

const app = express();
const todoRoute = require("./route/route");
const authRoute = require("./route/auth.route");


const port = process.env.PORT || 4000;


app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
// Correct MongoDB Atlas connection string
const url = 'mongodb+srv://pawanchouhan3101_db_user:nr4GFOZ8Yp0eyfH4@cluster0.utff9nn.mongodb.net/todoDB?retryWrites=true&w=majority';

mongoose.connect(url)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Connection failed:", err));

app.use(express.json());
app.get("/",(req,res)=>{
  console.log("Get")
  res.send("hello")
})
// Routes
app.use("/api/todo", todoRoute);
app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);

});
