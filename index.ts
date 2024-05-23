import express, { Request, Response, NextFunction, response } from 'express'; // Import 'Response' type from express

const app = express();
const PORT = 8000;
const db = require('./config/db');
const bodyParser = require("body-parser");

// Define an engine for views
app.set("view engine", "ejs");

// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// define a route for home page
app.get("/", (_req, res: Response) => {
    res.send("Hello")
});

// Creating a user
// app.get('/create',(_req, res: Response) =>{
//     let user= {user_id : 3, username: "user 3", pw: "user3" };
//     let sql= "INSERT INTO user_data SET ?";
//     let query= db.query(sql, user, (err: Error |null , _result: any)=>{
//         if(err) throw err;
//         // console.log(_result);
//         res.send("User added");
//     });
// });

// TODO
// 1. separate into proper folder structure

// POST request to insert data
app.post("/user", async (req, res) => {
    try {
        // Get the request body
        const reqBody = {
            username: req.body.username,
            pw: req.body.pw,
        };

        // Insert the request body into the database
        const query = `INSERT INTO user_data ( username, pw) VALUES (?, ?)`;
        db.query(query, [reqBody.username, reqBody.pw]);

        // Send a response to the client
        res.status(201).json({
            status: "success",
            message: "User Creation Sucess!"
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Could not create a user"
        });
    }

});

// Get users
app.get('/users', (req, res) => {
    let sql = "SELECT * FROM user_data";
    let query = db.query(sql, (err: Error, result: any) => {
        if (err) throw err;
        console.log(result);
        res.send(JSON.stringify(result))
    });
});

//Update user_details
app.put('/user/:id',(req,res)=>{
    try{
        console.log("Update!")
        let userId = req.params.id;
    
        const {username, pw} = req.body;
        let sql= "UPDATE user_data SET username=? , pw=? WHERE user_id=?  ";
        let query= db.query(sql, [username, pw, userId ]);

        res.status(201).json({
            status:"Success",
            message:"User information updated!"
        });
    }catch(err){
        console.log("Error");
        res.status(500).json({
            status:"error",
            message:"Server error"
        })
    }
   
})


// Delete data from table 
app.delete("/user/:id", (req, res) => {
    try{
        let userId = req.params.id;
        let sql = `DELETE FROM user_data WHERE user_id = ${userId}`;
        db.query(sql, (err: Error, result: any) => {
            if (err) throw err;
            console.log(result);
            res.send("User deleted");
            res.status(202).json({
                status:"success!",
                message: "user deleted!"
            })
        });
    }catch(err){
        res.status(500).json({
            status:"failed",
            message:"User delete fail!"
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server starting at port ${PORT}`);
})