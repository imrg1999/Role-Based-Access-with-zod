import { success } from "zod";
import userModel from "../Model/userModel.js";



export const userAccess = async(req,res) => {
    try{
        const userProfile = await userModel.findById(req.user.id).select("-password");
        if(!userProfile) {
            return res.status(404).json({
                success: false,
                message: "Profile Access Denied"
            })
        }
        res.status(200).json({
            success: true,
            message: "Welcome User",
            user: userProfile
        })
    } catch(error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Access Denied"
        })
    }
}

export const adminAccess = async(req,res) => {
    try{
        const admin = await userModel.findById(req.user.id).select("-password");
        if(!admin) {
        return res.status(404).json({
            success: false,
            message: "Access Denied"
        })
        }
        res.status(200).json({
            success: true,
            message: "Welcome, Admin",
            user: admin
        })
    }catch(error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Access Denied"
        })
    }
}

export const managerAccess = async(req,res) => {
    try{
        const manager = await userModel.findById(req.user.id).select("-password");
        if(!manager) {
            return res.status(404).json({
                success: false,
                message: "Access Denied"
            })
        } 
        res.status(200).json({
            success: true,
            message: "Welcome Manager",
            user: manager
        })
    }catch(error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Access Denied"
        })
    }
}