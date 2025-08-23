import mongoose, { mongo } from "mongoose";

const likeSchema = new mongoose.Schema(
    {
        photographer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Photographer"
        },

        likedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    }
)

const Like = mongoose.model("Like", likeSchema);

export default Like;