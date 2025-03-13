import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";


export const verifyJWT = asyncHandler(async(req, res, next) => {

    try {
        const token =  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer " , "") 
    
        if(!token){
            throw new ApiError(401, "No token provided")
        }
    
        const decoded = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded._id);
        if(!user){
            throw new ApiError(401, "User not found")
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, "Invalid token")
        
        
    }
})



