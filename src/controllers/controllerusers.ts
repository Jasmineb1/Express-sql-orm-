// Controller

import { userServices } from "../services/user.services";
import { Request, Response } from 'express';
const CircularJSON = require('circular-json');
import { IntegerType } from "typeorm";


async function createUser(req: Request, res: Response) {
    try {
        const { email, firstName, lastName, age } = req.body;
        const data= await userServices.createUsers({email, firstName, lastName,age });
        res.status(201).json({
            status: "success",
            message: "User Creation Success!"
        });
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({
            status: "error",
            message: "Could not create a user"
        });
    }
}

async function getUser(req: Request<{ id: number}>, res: Response) {
    try {
        const userId= req.params.id;
        const data = await userServices.getUsers(userId);
        
        console.log("GET controller")
        res.send(data);
        // const serializedUsers = CircularJSON.stringify(users);
        // res.send(serializedUsers);
        // res.status(200){
           
        // };
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({
            status: "error",
            message: "Could not fetch users"
        });
    }
}

async function updateUsers(req: Request<{id: number}>, res: Response) {
    try {
        const userId = req.params.id;
        const { firstName, lastName, age } = req.body;
        const data= await userServices.updateUsrs(userId, {firstName, lastName, age});
        res.status(200).json({
            data,
            status: "success",
            message: "User information updated!"
        });
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({
            status: "error",
            message: "Server error"
        });
    }
}

async function deleteuser(req: Request<{id: number}>, res: Response) {
    try {
        const userId = req.params.id;
        const data= await userServices.deleteUsers(userId);
        res.status(200).json({
            status: "success",
            message: "User deleted!"
        });
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({
            status: "error",
            message: "User delete failed"
        });
    }
}

export const usersController = {
    createUser,
    getUser,
    updateUsers,
    deleteuser
};
