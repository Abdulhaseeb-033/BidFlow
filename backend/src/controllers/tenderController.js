import Tender from "../models/tender.js";

export const createTender = async (req, res) => {
    try {
        const { name, client, referenceNumber, deadline, tenderType, description} = req.body;

        const companyId = req.user.companyId;

        const tender = await Tender.create({
            name,
            client,
            referenceNumber,
            deadline,
            tenderType,
            description,
            companyId
        });

        return res.status(201).json({
            message:"Tender created successfully",
            tender,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};

export const getTneders = async (req, res) => {
    try {
        const companyId = req.user.companyId;

        const tenders = await Tender.find({ companyId });

        return res.status(200).json({
            message: "Tenders fetched successfully",
            tenders,
        });
    } catch (error) { 
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};

export const getTenderById = async (req, res) => {
    try {
        const companyId = req.user.companyId;

        const tenderId = req.params.id;

        const tender = await Tender.findOne({
            _id: tenderId,
            companyId
        });
        if(!tender) {
            return res.status(404).json({
                message: "Tender not found",
            });
        }

        return res.status(200).json({
            message: "Tender fetched successfully",
            tender
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};

export const tenderUpdate = async (req, res) => {
    try {
        const companyId = req.user.companyId;
        const tenderId = req.params.id;

        const tender = await Tender.findByIdAndUpdate(
            {
                _id: tenderId,
                companyId
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if(!tender) {
            return res.status(404).json({
                message: "Tender not found"
            });
        }

        return res.status(200).json({
            message:"Tender updated successfully",
            tender
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

export const deleteTender = async (req, res) => {
    try {
        const companyId = req.user.companyId;
        const tenderId = req.params.id;

        const tender = await Tender.findByIdAndDelete({
            _id: tenderId,
            companyId
        });

        if(!tender){
            return res.status(404).json({
                message:"Tender not found"
            });
        }

        return res.status(200).json({
            message: "Tender deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Somethnig went wrong",
            error: error.message
        });
    }
};
