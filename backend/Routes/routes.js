const Employee = require("../Models/Employee");
const users = require("../Models/User");
const express = require("express");
const User = require("../Models/User");
const routes = express.Router();
//adding user
routes.post("/user/signup", async(req,res)=>{
    if(!req.body){
        res.status(500).send("No data!")
    }
     try {
        const addUser = new User({
            ...req.body
        })
        await addUser.save();
        res.status(201).send("User Created Successfully!")
                        
    } catch (error) {
        res.status(500).send(error)
    }
})

routes.post("/user/login", async(req,res)=>{
    const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Invalid Username"
    });
    }

    if (user.password === password) {
      return res.status(200).json(
        {
            status: true,
            username: `${username}`,
            message: "User logged in successfully"
        
        }
        
      );
    } else {
        return res.status(401).json({
            status: false,
            message: "Invalid Password"
        });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
})
// getting all
routes.route("/emp/employees")
    .get(async(req,res)=>{
        try {
            const allEmployee = await Employee.find({});
            res.status(200).send(allEmployee)
        } catch (error) {
            res.status(500).send(error)
        }
    })

    //create employee
    .post(async(req,res)=>{
        if(!req.body){
            res.status(500).send("No data!")
        }
        try {
            const addEmp = new Employee({
                ...req.body
            })
            await addEmp.save();
            res.status(201).send("Employee Created Successfully!")
                            
        } catch (error) {
            res.status(500).send(error)
        }
    })
    .delete(async (req,res)=>{
        try {
            
            await Employee.findByIdAndDelete(req.query.eid)
            res.status(204).send("Deleted Successfully!")
            
        } catch (error) {
            res.status(500).send(error)
        }
        
        
    } )
    //get single employees 
    routes.route("/emp/employees/:eid")
         .get(async (req,res)=>{
            try {
                const getEmplByID = await Employee.findById(req.params.eid);
                res.status(200).send(getEmplByID)
            } catch (error) {
                res.status(500).send(error)
            }
           
         })
         //update employee
         .put(async (req, res) => {
            try {
               const updatedEmployee = await Employee.findByIdAndUpdate(
                  req.params.id,
                  { ...req.body },
                  { new: true } 
               );
         
               if (!updatedEmployee) {
                  return res.status(404).send("Employee not found");
               }
         
               res.status(200).send("Data Updated Successfully");
            } catch (error) {
               console.error(error);
               res.status(500).send(error.message || "Internal Server Error");
            }
         });
         

    
module.exports = routes;