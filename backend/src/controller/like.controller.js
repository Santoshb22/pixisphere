import Like from "../models/like.model.js";

const toggleLike = async (req, res) => {
    try {
        const { photographerId } = req.body;

        const user = req.user;
        const isLiked = await Like.findOne({photographer: photographerId, likedBy: user._id})

        if(isLiked) {
            await Like.findByIdAndDelete(isLiked._id);
            return res.status(200).json({ message: "Unliked successfully" });   
        }

        await Like.create({
            photographer: photographerId,
            likedBy: user._id
        })

        return res.status(200).json({message: "Like successfull"});
    } catch (error) {
        console.error("Error toggling like:", error.message);
        res.status(500).json({ message: "Something went wrong, try again" });    }
}

export {
    toggleLike,
}