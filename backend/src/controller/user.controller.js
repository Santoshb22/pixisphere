import User from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const generateAccessAndRefreshToken = async (userId) => {

    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.save({validateBeforeSave: false});

    return {accessToken, refreshToken};
}

const register = async (req, res) => {
    try {
        const {username, email, password, role} = req.body;
        if([username, email, password, role].some((field) => field.trim() === "")) {
            return res.status(400).json({message: "All fields are required"});
        }
        const avatarLocalPath = req.file?.path;

        const userWithUsername = await User.findOne({ username });
        if (userWithUsername) {
            return res.status(409).json({message: "Username already exist"})
        }

        const userWithEmail = await User.findOne({ email });
        if (userWithEmail) {
            return res.status(409).json({message: "Email already exist"})
        }

        let avatarUrl = "";

        if (avatarLocalPath) {
        const avatarUploadResponse = await uploadOnCloudinary(avatarLocalPath);
        avatarUrl = avatarUploadResponse?.url || "";
        }
        const createNewUser =  await User.create({username, email, password, role, avatar: avatarUrl || ""})

        const createdUser = await User.findById(createNewUser._id).select(
            "-password -refreshToken"
        )

        return res.status(201).json({success: true, message: "User registered successfully", user: createdUser});

    } catch (error) {
        console.log("error::", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

const login = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        if(!email && !username) {
            return res.status(400).json({message: "Email or Username required"});
        }

        const user = await User.findOne({
            $or: [{email}, {username}]
        })

        if(!user) {
            return res.status(400).json({message: "User doesn't exist"});
        }

        const isPasswordValid = await user.isPasswordMatch(password);

        if(!isPasswordValid) {
            return res.status(401).json({message: "Password is incorrect"});
        }

        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);

        const LoggedInUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )
        const options = {
            httpOnly: true,
            secure: true

        }
        return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            success: true, 
            message: "LoggedIn successfull",
            user: LoggedInUser, accessToken, refreshToken
        })

    } catch (error) {
        console.log("error:: ", error);
        return res.status(500).json({success: false, message: `Failed to login :: ${error.message}`});
    }
}

const logout = async (req, res) => {
    try {
        await User.findOneAndUpdate(req.user._id, 
            {
                $unset: {
                    refreshToken: 1,
                }
            },
            {
                new: true
            }
        )

        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({message: "User logged out"})
    } catch (error) {
        return res.status(500).json({message: "Log out failed"})
    }
}

const generateNewRefreshToken = async(req, res) => {
    try {
        const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;
        if(!incomingRefreshToken) {
            return res.status(401).json({message: "Unauthorized request"});
        }

        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        
        const user = await User.findById(decodedToken._id);

        if(!user) {
            return res.status(401).json({message: "Invalid refresh token"});
        }

        if(user.refreshToken !== incomingRefreshToken) {
            return res.status(401).json({message: "Refresh token is expired or used"});
        }

        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);

        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({message: "Access token refreshed"});
    } catch (error) {
        return res.status(401).json({message: error.message || "Invalid refresh token"});
    }
}

export {
    register,
    login,
    logout,
    generateNewRefreshToken
}