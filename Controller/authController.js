import { ZodError } from "zod";
import userModel from "../Model/userModel.js";
import { passwordHashing } from "../Utility/passwordHashing.js";
import zodSchema  from "../Utility/zodSchema.js";

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