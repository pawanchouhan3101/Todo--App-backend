const mongoose=require("mongoose")

const User=require("./user.module")
 
const todoSchema= new mongoose .Schema({
    title: {
      type: String,
      required: true,
      
    },
    description: {
         type: String,
      required: true,
      
    
    },

    userid:{
  type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", 
    }
})

module.exports = mongoose.model("Todo", todoSchema);