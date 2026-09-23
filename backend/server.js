import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoute.js";
import tenderRouter from "./src/routes/tenderRoute.js";
import tenderDocumentRoutes from "./src/routes/tenderDocumentRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/tenders", tenderRouter);
app.use("/api/tenders", tenderDocumentRoutes);
app.get("/", (req, res) => {
    res.json({
        message: "BidFlow API is runing",
    });
});

app.listen(process.env.PORT, () => {
    console.log(`BidFlow server running on port ${process.env.PORT}`);
});