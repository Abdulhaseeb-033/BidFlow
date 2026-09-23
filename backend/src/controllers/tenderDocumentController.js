import Tender from "../models/tender.js";
import TenderDocument from "../models/TenderDocument.js";

export const uploadTenderDocument = async (req, res) => {
    try {
        const companyId = req.user.companyId;
        const tenderId = req.params.id;

        const tender = await Tender.findOne({
            _id: tenderId,
            companyId
        });

        if(!tender) {
            return res.status(404).json({
                message: "Tender not found"
            });
        }

        if(!req.file) {
            return res.status(400).json({
                message: "PDF file is required"
            });
        }

        const document = await TenderDocument.create({
            tenderId,
            fileName: req.file.originalname,
            fileUrl: req.file.path,
            fileType: req.file.mimetype,
            companyId
        });

        return res.status(201).json({
            message: "Tender document upload successfully",
            document
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};