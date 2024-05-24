import  { Request, Response, NextFunction, response, Application } from 'express'; // Import 'Response' type from express
import bodyParser from 'body-parser';
import { db } from './datasource';

const express= require('express');
const app = express();
const PORT = 8000;


// const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true}));

// defining user router
const userRouter= require('./routes/userRoutes');
app.use("/user", userRouter);

// Define an engine for views
app.set("view engine", "ejs");

// Middleware for parsing JSON
app.use(express.json());


// define a route for home page
app.get("/", (_req, res: Response) => {
    res.send("Hello")
});

// TODO
// 1. separate into proper folder structure

// POST request to insert data

app.listen(PORT, async() => {
    try{
        await db.initialize();
    }catch(err){
        console.log(err);
    }
    

    console.log(`Server starting at port ${PORT}`);
})