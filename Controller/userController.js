import { success, ZodError } from "zod";
import userModel from "../Model/userModel.js";
import { passwordHashing } from "../Utility/passwordHashing.js";
import zodSchema from "../Utility/zodSchema.js";

export const showAllUsers = async(req,res) => {
    try{
        const allUsers = await userModel.find();
        if(!allUsers || !allUsers.length === 0) {
        return res.status(400).json({
                success: false,
                message: "No Users Listed",
                users: []
            })
        }
        res.status(200).json({
            success: true,
            message: "Users are listed below",
            users: allUsers
        })
    } catch(error) {
        console.log(error.message);
        
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const addNewUser = async(req,res) => {
    try{
        const newUserFormat = await zodSchema.parseAsync(req.body);
        const existingUser = await userModel.findOne({email: newUserFormat.email});
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        const hashPassword = await passwordHashing(newUserFormat.password);
        const newUser = await userModel.create({
            ...newUserFormat,
            password: hashPassword
        })
        if(!newUser) {
        return res.status(400).json({
                success: false,
                message: "No new user created"
            })
        }
        res.status(201).json({
            success: true,
            message: "New User Created Successfully",
            user: newUser
        })
    } catch(error) {
        if(error instanceof ZodError) {
            return res.status(400).json({
            success: false,
            message: "Invalid Request",
            error: error.issues
        })
        }
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}