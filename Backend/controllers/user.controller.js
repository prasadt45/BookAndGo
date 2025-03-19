import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Apiresponce } from "../utils/Apiresponce.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const generateAccessandRefreshTokens = async(userid)=>{
    try {
        const user =  await User.findById(userid);
        const accesstoken = user.generateAccessTokens();
        const refreshtoken = user.generateRefreshTokens();
       user.refreshToken = refreshtoken;
       await user.save({validateBeforeSave:false});
        return {accesstoken , refreshtoken};

    } catch (error) {
        throw new ApiError(500, "Internal Server Error while generating token");

    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;

    if (!fullname || !fullname.firstname || !fullname.lastname || !email || !password) {
        throw new ApiError(400, 'Please fill all the fields');
    }

    const { firstname, lastname } = fullname;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(400, 'User already exists');
    }

    const user = await User.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
    });

    if (!user) {
        throw new ApiError(400, 'User not registered');
    }

    const createdUser = await User.findById(user._id).select('-password');

    return res.status(200).json(
        new Apiresponce(200, createdUser, 'User registered successfully')
    );
});

const loginuser = asyncHandler(async(req , res)=>{
    const {email , password} = req.body;
    if(!email || !password){
        throw new ApiError(400, 'Please fill all the fields');
    }
    const isuser = await User.findOne({email}).select('+password');
    if(!isuser){
        throw new ApiError(400, 'Invalid Credentials');
    }

    const isvalidpassword = await isuser.comparepassword(password); 
    if(!isvalidpassword){
        throw new ApiError(400, 'Invalid Credentials');
    }

    const {accesstoken , refreshtoken} = await generateAccessandRefreshTokens(isuser._id);

    const loggedinuser = await User.findById(isuser._id).select('-password -refreshToken');

    const cookieoptions={
        httpOnly : true,
        secure : true 
    }

    return res.status(200)
    .cookie('refreshtoken', refreshtoken , cookieoptions)
    .cookie('accesstoken', accesstoken , cookieoptions)
    .json(
        new Apiresponce(200, loggedinuser, 'User logged in successfully')
    );


})


export { registerUser  , loginuser };
