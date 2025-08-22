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

        businessContactNumber: {
            type: Number,
        },

        bio: {
            type: String,
            trim: true,
        },

        thumbnail: {
            type: String,
        },

        portfolio: [
            {
                image: {
                    type: String, //cloudinary url
                },

                title: {
                    type: String,
                    minlength: [3, 'Title must be at least 3 characters long'],
                    maxlength: [50, 'Title cannot exceed 50 characters'],     
                    trim: true
                }
            }
        ],

        likedby: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        ratings: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
                value: {
                    type: Number,
                    min: 1,
                    max: 5
                }
            }
        ],

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