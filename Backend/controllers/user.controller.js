import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Apiresponce } from "../utils/Apiresponce.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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

export { registerUser };
