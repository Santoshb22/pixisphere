import User from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js"
class UserService {
    async createUser(username, email, password, role, avatarLocalPath) {

        const userWithUsername = await User.findOne({ username });
        if (userWithUsername) {
            throw { code: 409, message: "Username already exists" };
        }

        const userWithEmail = await User.findOne({ email });
        if (userWithEmail) {
            throw { code: 409, message: "Email already exists" };
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath);

        return await User.create({username, email, password, role, avatar: avatar?.url || ""})
    }
}

export default UserService;