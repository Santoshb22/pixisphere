import Rating from "../models/rating.model";

const updateRating = async(req, res) => {
    try {
        const {photographerId, value, review} = req.body;
        const updateRating = {
            value,
            review,
        }
        const user = req.user;

        const existingRating = await Rating.findOne({ photographer: photographerId, ratedBy: user._id });

        if(existingRating) {
            const updated = await Rating.findByIdAndUpdate(
                existingRating._id,
                updateRating, 
                { new: true}
            );

            return res.status(200).json({message: "Rating update successfully", rating: updated});
        }

        const newRating = await Rating.create({
            photographer: photographerId,
            ratedBy: user._id,
            value,
            review
        });

        return res.status(201).json({message: "Rating successful", rating: newRating});
    } catch (error) {
        console.error("Error in updateRating:", error.message);
        res.status(500).json({message: "Something went wrong"})
    }
}

const deleteRating = async(req, res) => {
    try {
        const {ratingId} = req.body || req.params;

        const rating = await Rating.findByIdAndDelete(ratingId);

        if(!rating) {
            return res.status(404).json({message: "User rating not found"});
        }

        return res.status(200).json({message: "User rating deleted successfully"});
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({message: "Failed to delete rating"});
    }
}

export {
 updateRating,
 deleteRating
}