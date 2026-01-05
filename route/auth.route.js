const express = require("express");
const router = express.Router();
const User = require("../module/user.module");

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  const newuserCreate = new User({
    name,
    email,
    password,
  });
  newuserCreate.save();
  res.status(201).json({ message: "user is created succesfully" });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const Ifuser = User.findOne({ email: email });
  Ifuser.then((data) => {
    if (data.password === password) {
      res.status(200).json(data);
    } else {
      res.status(401).json({ message: `Wrong password` });
    }
  }).catch((error) => {
    res.status(400).json({ message: "user not found" });
  });
});



router.get('/alluser',(req,res)=>{
    const alluser= User.find({});
    alluser.then((data)=>{
        res.status(200).json(data)
    })
    .catch((error)=>{
        res.status(400).json({message:"error in fetching"})
    })
})

module.exports = router;
