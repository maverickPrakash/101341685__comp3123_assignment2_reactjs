const mongoose = require("mongoose");
const userModel = mongoose.Schema({
        username:{
            type:String,
            unique:true, 
            required:true,
            maxlength: 100
        },
        email:{
            type:String,
            unique:true, 
            maxlength: 50
        },
        password:{
            type:String,
            maxlength: 50
        }

})

module.exports = mongoose.model("User", userModel);