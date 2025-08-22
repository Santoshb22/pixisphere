import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyToken = async (req, res, next) => {
    try {
        const accessToken = req.cookies?.accessToken || req.header(Authorization)?.replace("Bearer ", "");
    
        if(!accessToken) {
            return res.status(401).json("Unauthorized user");
        }
    
        const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decodedAccessToken.payload.id).select("-password -refreshToken");
    
        if(!user) return res.status(401).json({message: "Invalid access token"});
    
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({message: error.message || "Invalid access token"});
    }
}

const authorizedRole = (allowedRoles) => {
    return (req, res, next) => {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: "User unauthenticated" });
        }

        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({ message: "You're not authorized for this route" });
        }

        next();
    }
}

export {
    verifyToken,
    authorizedRole
} 