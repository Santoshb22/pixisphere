import mongoose from "mongoose";

const portfolioSchema = new mongoose(
    {
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