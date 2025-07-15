import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        unique: true
    },
    mobile:
    {
        type: String,
        required: true
    },
    password:
    {
        type: String,
        select: false
    },
    role:
    {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    isVerified:
    {
        type: Boolean,
        default: false
    },

    otp: String,
    otpExpires: Date,

    resetToken: String,
    resetTokenExpires: Date,
});

export default mongoose.model("User", userSchema);
