import { Router } from "express";
import { usersController } from "../controllers/controllerusers";


const db= require('../../config/db');
const express= require('express');

const router= express.Router();
// const {createUsers, getUsers, updateUsrs, deleteUsers}= require('../controllers/controllerusers')


// Getting the routes

// getting and posting users
router.get("/", usersController.getUser);
router.post("/", usersController.createUser);

//Update user_details
router.put('/:id',usersController.updateUsers);

// Delete data from table 
router.delete("/:id", usersController.deleteuser);

module.exports= router;