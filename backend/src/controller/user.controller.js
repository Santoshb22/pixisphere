import User from "../models/user.model.js";
import UserService from "../services/user.service.js";

const userService = new UserService();

const register = async (req, res) => {
    try {
        const {username, email, password, role} = req.body;
        if([username, email, password, role].some((field) => field.trim() === "")) {
            return res.status(400).json({message: "All fields are required"});
        }
        const avatarLocalPath = req.file?.path;

        const user = await userService.createUser(username, email, password, role, avatarLocalPath)

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )

        return res.status(201).json({success: true, message: "User registered successfully", user: createdUser});

    } catch (error) {
        if (error.code === 409) {
           return res.status(409).json({ success: false, message: error.message });
        }
    
        console.log(error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}


export {
    register
}