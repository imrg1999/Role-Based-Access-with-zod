import { success, ZodError } from "zod";
import userModel from "../Model/userModel.js";
import { passwordHashing } from "../Utility/passwordHashing.js";
import zodSchema  from "../Utility/zodSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async(req,res) => {
    try{
        const regUserFormat = await zodSchema.parseAsync(req.body);
        const registeredUser = await userModel.findOne({email: regUserFormat.email});
        if(registeredUser) {
            return res.status(400).json({
                success: false,
                message: "The user is already registered"
            })
        }
        const registerPassword = await passwordHashing(regUserFormat.password);
        const registeredNewUser = await userModel.create({
            ...regUserFormat,
            password: registerPassword
        })
        if(!registeredNewUser) {
            return res.status(400).json({
                success: false,
                message: "Registration request failed"
            })
        }
        res.status(200).json({
            success: true,
            message: "Registration Successful",
            user: registeredNewUser
        })
    } catch(error) {
        if(error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                error: error.issues
            })
        }
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const logInUser = async(req,res) => {
    try{
        const logInReqFormat = await zodSchema.parseAsync(req.body);
        const registered = await userModel.findOne({email: logInReqFormat.email});
        if(!registered) {
            return res.status(400).json({
                success: false,
                message: "The User isn't registered yet"
            })
        }
        
        const validUser = await bcrypt.compare(logInReqFormat.password, registered.password);
        const token = jwt.sign({id: registered._id, email: registered.email},
            process.env.JWT_SECRET, {expiresIn: '1h'}
        )
        if(!validUser) {
        return res.status(400).json({
                success: false,
                message: "Invalid User"
            })
        }
        res.status(200).json({
            success: true,
            message: "Valid User",
            token: token
        })
    } catch(error) {
        if(error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                error: error.issues
            })
        }
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}