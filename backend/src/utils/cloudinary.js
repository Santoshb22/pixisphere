import {v2 as cloudinary} from "cloudinary";
import {fs} from "fs";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!cloudinary) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "image",
        })

        return response;
    } catch (error) {
        console.log("Failed to upload image:", error);  
        return null;     
    } finally {
        fs.unlink(localFilePath, (err) => {
            if (err) console.log("Failed to delete local file:", err);
        });
    }
}

module.exports = uploadOnCloudinary;