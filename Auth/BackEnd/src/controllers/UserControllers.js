import express from 'express'
import User from '../models/UserModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const Register = async (req, res) => {
    const { name, email, mobile, password } = req.body;
    if( !name || !email || !mobile || !password){
        return res.status(400).json({message: "All fields are required!"})
    } 
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already registered." });
        }

        const user = new User({ name, email, mobile, password })
        await user.save();

        const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn: '1d'})
        
        res.cookie('token',token,{
            httpOnly: true,
            sameSite: 'Lax',
            secure: false
        })

        const {password:_, ...userWithoutPassword} = user.toObject()
        res.status(200).json({token, user: userWithoutPassword})
    } catch (error) {
        res.status(400).json({ message: error.message || "User not registered" });
    }
}

export const Login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email}).select('+password')
        if(!user){
             return res.status(404).json({ message: "User not found" })
        }
        const match = await bcrypt.compare(password, user.password)
        if(!match){
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn: '1d'})
        res.cookie("token",token, {
            httpOnly: true,
            sameSite: 'Lax',
            secure: false
        })

        const {password:_, ...userWithoutPassword} = user.toObject()
        res.status(200).json({token, user: userWithoutPassword})

    } catch (error) {
         res.status(500).json({ error: error.message || "Login Failed!!" });
    }
}

export const GetUser = async (req, res) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message: "No token is provided"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id).select('-password')
        if(!user){
            return res.status(404).json({ message: "User Not Found" })
        }
        res.json(user)
    } catch (error) {
         res.status(401).json({ message: "Invalid Token" })
    }
} 

export const Logout = async (req, res) => {
    res.clearCookie('token',{
        httpOnly: true,
        sameSite: 'Lax',
        secure: false
    })
    return res.status(200).json({ message: "Logged out successfully" });
}