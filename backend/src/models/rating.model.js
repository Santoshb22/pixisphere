import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
    {
        photographer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Photographer"
        },

        ratedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        value: {
            type: Number,
            min: 1,
            max: 5,
            message: String,
        }
    }
)

const Rating = mongoose.model("Rating", ratingSchema);

export default Rating;