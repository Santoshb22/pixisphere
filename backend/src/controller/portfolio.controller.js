import Portfolio from "../models/portfolio.model";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary";

const addImageToPortfolio = async(req, res) => {
    try {
        const user = req.user;
        const localImagePath = req.file?.path;

        if (!localImagePath) {
            return res.status(400).json({ message: "No image file provided" });
        }

        const uploaded = await uploadOnCloudinary(localImagePath);
        const uploadedImg = {
            image: uploaded.url || "",
            cloudinaryPublicId: uploaded.public_id || ""
        }

        let portfolio = await Portfolio.findOne({owner: user._id})
        if(!portfolio) {
            const portfolio = await Portfolio.create({
                owner: user._id,
                portfolio: [uploadedImg]
            })

            return res.status(201).json({message: "Uploaded successfully", portfolio});
        }

         portfolio = await Portfolio.findByIdAndUpdate(
            portfolio._id,
            { $push: {portfolio: uploadedImg}},
            {new: true, runValidators: true}
        )

        return res.status(200).json({message: "Uploaded successfully", portfolio});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || "Something went wrong" });
    }
}

const deleteImageFromPortfolio = async(req, res) => {
    try {
        const { public_id } = req.body;
        const user = req.user;

        if (!public_id) {
            return res.status(400).json({ message: "public_id is required" });
        }
        await deleteFromCloudinary(public_id);

        const portfolio = await Portfolio.findOne({owner: user._id});

        const updatePortfolio = await Portfolio.findByIdAndUpdate(
            portfolio._id,
            {$pull: {portfolio: { cloudinaryPublicId: public_id}}},
            { new: true}
        )

        return res.status(200).json({ message: "Image deleted successfully", portfolio: updatePortfolio  });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || "Something went wrong" }); 
    }
}
 
const getAllPortfolioImage = async(req, res) => {
    try {
        const user = req.user;

        const portfolio = await Portfolio.findOne({ owner: user._id});

        if (!portfolio) {
            return res.status(404).json({ message: "No portfolio found for this user", portfolio: [] });
        }

        return res.status(200).json({message: "SuccessFully fetched all portfolio images", portfolio: portfolio.portfolio});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || "Something went wrong" }); 
    }
}

export {
    addImageToPortfolio,
    deleteImageFromPortfolio,
    getAllPortfolioImage
}