import mongoose from "mongoose";

const portfolioSchema = new mongoose(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Photographer"
        },

        portfolio: [
            {
                image: {
                    type: String,
                },

                cloudinaryPublicId: {
                    type: String
                }
            }
        ]
    },

    {
        timestamps: true
    }
)

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;