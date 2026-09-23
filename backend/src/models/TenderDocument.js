import mongoose from "mongoose";

const tenderDocumentSchema = new mongoose.Schema(
    {
        tenderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tender",
            required: true,
        },

        fileName: {
            type: String,
            required: true,
            trim: true,
        },

        fileUrl: {
            type: String,
            required: true,
        },

        fileType: {
            type: String,
            required: true
        },

        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true
        },
    },
    {
        timestamps: true
    }
);

const TenderDocument = mongoose.model("TenderDocument", tenderDocumentSchema);

export default TenderDocument;