import jwt from "jsonwebtoken"
import User from "../model/authModel.js"

export const AuthMiddleware = async (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token" })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select("-password")
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}

export const AdminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" })
  }
  next()
}
