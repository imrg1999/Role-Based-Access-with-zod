import userModel from "../Model/userModel.js";

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