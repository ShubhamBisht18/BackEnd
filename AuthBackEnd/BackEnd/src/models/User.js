// ES Module version (use this one)
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
}, { timestamps: true });

// 🔐 Password hashing before saving to DB
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Skip if password is unchanged

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

export default mongoose.model('User', userSchema);
