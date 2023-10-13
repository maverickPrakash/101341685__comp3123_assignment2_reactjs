const mongoose = require("mongoose");
const EmployeeModel = mongoose.Schema({
    first_name:{
        type:String,
        require:true,
        maxlength: 100
    },
    last_name:{
        type:String,
        require:true,
        maxlength: 50
    },
    email:{
        type:String,
        unique:true,
        maxlength: 50
    },

    gender:{
        type:String,
        maxlength: 25,
        enum:["Male","Female",")ther"]
    },
    salary:{
        type:Number,
        require:true
    }
        
})

module.exports = mongoose.model("Employee", EmployeeModel);