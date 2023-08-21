
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');

const catchAsyncErrors = require('../middleware/catchAsyncErrors'); // Catching async errors
const ErrorHandler = require('../utils/errorHandler'); // throwing validation errors



// Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password,
    });

    // Create token and save it in cookie
    sendToken(user, 201, res);
});


// Login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password"); // password is specified select: false in schema so to fetch password we need to use select function


    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    // Create token and save it in cookie
    sendToken(user, 200, res);
});