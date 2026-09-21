import mongoose from "mongoose";

const tenderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        client: {
            type: String,
            required: true,
            trim: true
        },

        referenceNumber: {
            type: String,
            required: true,
            trim: true
        },

        deadline: {
            type: Date,
            required: true
        },

        tenderType: {
            type: String,
            enum: ["Tender", "RFP", "RFQ"],
            required: true
        },

        description: {
            type: String,
            trim: true
        },

        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true
        },

        status: {
            type: String,
            enum: ["Draft", "Under Review", "Ready", "Submitted", "Won", "Lost"],
            default: "Draft",
        },
    },
    {
        timestamps: true,
    }
);

const Tender = mongoose.model("Tender", tenderSchema);
export default Tender;