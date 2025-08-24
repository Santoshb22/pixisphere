import mongoose from "mongoose";

const photographerSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        name: {
            type: String,
            trim: true,
            minlength: [1, "Name cannot be less that 1 character"],
            maxlength: [30, "Name cannot be grater than 30 charaycter"]
        },

        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true, 
        },

        bio: {
            type: String,
            trim: true,
        },

        serviceTypes: {
            type: [String], 
            enum: [
                "Portrait",
                "Wedding",
                "Fashion",
                "Commercial",
                "Landscape",
                "Sports",
                "Photojournalism",
                "Architectural",
                "Travel",
                "FineArt",
                "Macro",
                "Astrophotography",
                "Food",
                "Street",
                "Underwater",
                "Drone"
                ],
            required: true,
            validate: [arr => arr.length > 0, "At least one service type is required"]
        },

        thumbnail: {
            cloudinaryThumbnailUrl: {
                type: String
            },

            cloudinaryThumbnailPublicId: {
                type: String
            }
        },

        isPublic: {
            type: Boolean,
            default: false,
        },

        paymentPlan: {
            type: String,
            enum: ["none", "monthly", "yearly"],
            default: "none",
        }
    }, 
    
    {
        timestamps: true,
    }
)

const Photographer = mongoose.model("Photographer", photographerSchema);

export default Photographer;