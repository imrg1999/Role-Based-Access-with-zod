import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email address"]
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user","admin","manager"],
        required: true
    }
}, {timestamps: true})

const userModel = model("User",userSchema);
export default userModel;