import Photographer from "../models/photographer.model.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

const updatePhotographerProfile = async (req, res) => {
    try {
        const updatedData = req.body;
        const thumbnailImgLocalPath = req.file?.path;

        let photographerProfile = await Photographer.findOne({ owner: req.user._id });

        if (!photographerProfile) {
            if (thumbnailImgLocalPath) {
                const uploaded = await uploadOnCloudinary(thumbnailImgLocalPath);
                updatedData.thumbnail = {
                    cloudinaryThumbnailUrl: uploaded?.url || "",
                    cloudinaryThumbnailPublicId: uploaded?.public_id || ""
                }
            }

            photographerProfile = await Photographer.create({
                owner: req.user._id,
                ...updatedData
            });

            return res.status(201).json({
                message: "Photographer profile updated successfully",
                photographerProfile
            });
        }

        if (thumbnailImgLocalPath) {
            if (photographerProfile.thumbnail?.cloudinaryThumbnailPublicId) {
                await deleteFromCloudinary(photographerProfile.thumbnail.cloudinaryThumbnailPublicId);
            }

            const uploaded = await uploadOnCloudinary(thumbnailImgLocalPath);
            updatedData.thumbnail = {
                cloudinaryThumbnailUrl: uploaded?.url || "",
                cloudinaryThumbnailPublicId: uploaded?.public_id || ""
            };
        }

        const updatedProfile = await Photographer.findOneAndUpdate(
            { owner: req.user._id },
            { $set: updatedData },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            message: "Photographer profile updated successfully",
            photographerProfile: updatedProfile
        });

    } catch (error) {
        console.log("Error ::", error.message);
        res.status(500).json({ message: error.message || "Something went wrong" });
    }
};


export {
    updatePhotographerProfile
}