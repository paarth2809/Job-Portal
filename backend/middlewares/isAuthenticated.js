import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Ensure .env is loaded

const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies; // Ensure cookies are parsed correctly

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        // // Ensure the environment variable is set
        // if (!process.env.JWT_SECRET) {
        //     console.error("Error: JWT_SECRET is missing in environment variables.");
        //     return res.status(500).json({ message: "Internal Server Error: Missing JWT_SECRET" });
        // }

        // Verify token
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        if(!decode){
            return res.status(401).json({
                message: "Invalid or expired token",
                success: false,
            }); 
        }
        req.id = decode.userId; // Store user info in request object
        next();
    } catch (error) {
        console.error("Authentication Error:", error);
    }
};

export default isAuthenticated;
