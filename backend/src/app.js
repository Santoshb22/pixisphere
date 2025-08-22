import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: process.env.CORS_LINK, Credential: true }))
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"));
app.use(cookieParser())

//api routes
import userRoute from "./routes/user.route.js";
import photographerRoute from "./routes/photographer.route.js";

app.use("/api/v1/user", userRoute);
app.use("/api/v1/photographer", photographerRoute);
export default app;