import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const Register = async (req, res) => {
    const { name, email, mobile, password } = req.body;
    try {
        // create a new user
        const user = new User({ name, email, mobile, password })
        // bycrpt the password using => .save()
        await user.save()
        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        // store token in cookie
        res.cookie("token", token, {
            httpOnly: true,     // hide from JavaScript
            sameSite: "Lax",    // allow in basic navigation
            secure: false       // okay for localhost (HTTP)
        });


        // Remove password before sending response
        const { password: _, ...userWithoutPassword } = user.toObject();

        // Send token and user data
        res.status(200).json({ token, user: userWithoutPassword });
    } catch (error) {
        res.status(400).json({ message: error.message || "User not registered" });
    }
}

export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // find the user using email and password => +password bcz User.js -> select : false;  (means hidden)
        const user = await User.findOne({ email }).select('+password')
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        // compare frontend password to database password = > compare() -> temperoraly bycrypt the password to chk 
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        // jwt token that contain the userID
        const token = jwt.sign({ id: user._id, }, process.env.JWT_SECRET, { expiresIn: '1d' })

        // store token in cookie
        res.cookie("token", token, {
            httpOnly: true, // hide from JavaScript
            sameSite: "Lax", // allow in basic navigation
            secure: false    // okay for localhost (HTTP)
        });

        //user.toObject => convert mongoDB data into Js object \\ password: _ it take password out of the object \\ ...userWithoutPassword contain object wihtout password 
        const { password: _, ...userWithoutPassword } = user.toObject();

        // send all data to frontend contain => id, name, email, mobile but not password 
        res.json({ token, user: userWithoutPassword })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getUser = async (req, res) => {
    // extract token from the frontend data 
    const token = req.cookies.token;
    ;
    if (!token) {
        return res.status(401).json({ message: "No token is provided" })
    }
    try {
        // chk the frontend Token and backend Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // the token contain the user id \\  deocode.id => is used to find the data that contain same id \\ and then exlude password from that data
        const user = await User.findById(decoded.id).select('-password')
        if (!user) {
            return res.status(404).json({ message: "User Not Found" })
        }
        res.json(user)
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" })
    }
}

// controller/authController.js
export const Logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "Lax", // match your login/register setup
        secure: false    // set to true in production with HTTPS
    });
    return res.status(200).json({ message: "Logged out successfully" });
};
