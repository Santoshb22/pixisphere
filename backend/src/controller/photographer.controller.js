import Photographer from "../models/photographer.model.js";

const updatePhotographerProfile = async(req, res) => {
    try {
        const updatedData = req.body;

        const photographerProfile = await Photographer.findOne({owner: req.user._id});

        if(!photographerProfile) {
            const photographerProfile = await Photographer.create({
                owner: req.user._id,
                ...updatedData
            });

            return res.status(201).json({message: "Photographer profile created successfully", photographerProfile});
        }

        const updatedProfile = await Photographer.findByIdAndUpdate(
            { owner: req.user._id },
            { $set: updatedData },
            { new: true, runValidators: true }
        );

        return res.status(200).json({message: "Update photographer profile successfully", photographerProfile: updatedProfile});

    } catch (error) {
        console.log("Error ::", error.message);
        res.status(500).json({message: "Something went wrong"});
    }
}

export {
    updatePhotographerProfile
}