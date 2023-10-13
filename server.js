const express = require("express");
const app = express();
const routes = require("./Routes/routes")

const mongoose = require("mongoose");
const DB_CONNECTION_STRING = "mongodb+srv://root:prakash143@cluster0.1ly2v5i.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority"




mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
app.use(express.json())

app.use("/api/v1",routes)
app.listen(8890, ()=>{
    console.log("The server is running on the port 8890")
})