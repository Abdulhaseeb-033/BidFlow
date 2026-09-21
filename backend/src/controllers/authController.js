import User from "../models/User.js"
import Company from "../models/Company.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const { name, companyName, industry, email, password } = req.body;

        const company = await Company.create({
            name: companyName,
            industry,
        });

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashPassword,
            companyId: company._id,
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                companyId: user.companyId
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message: "Invalid or email or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                companyId: user.companyId,
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1d",
            }
        );

        return res.status(200).json({
            message:"Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                companyId: user.companyId
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
};