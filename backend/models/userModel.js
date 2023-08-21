const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should be more than 5 characters"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password should be greater than 8 characters"],
        select: false, // Won't return password in the find query
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})


// encrypting password before saving it in database. 
userSchema.pre('save', async function (next) {

    // if the password is unchanged then continue
    if (!this.isModified('password')) {
        next();
    };

    this.password = await bcrypt.hash(this.password, 10);

});


// JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}


// Compare passwords 
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model("user", userSchema);