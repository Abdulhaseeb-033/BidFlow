import Tender from "../models/tender.js";
import TenderDocument from "../models/TenderDocument.js";
import { PDFParse }from "pdf-parse";

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

        const fs = await import("fs/promises");

        const pdfBuffer = await fs.readFile(req.file.path);

        const parser = new PDFParse({
            data: pdfBuffer
        });
        
        const pdfData = await parser.getText();

        const extractedText = pdfData.text;
        console.log(extractedText);

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