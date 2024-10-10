import db from '../config/db.js'
import bcryptjs from 'bcryptjs'
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js'
import { createUser, findUserById } from '../models/userModel.js';

export const signup = async (req, res) => {
    const {email, username, password} = req.body;
    
    try {
        if(!email || !password || !username){
            throw new Error("All fields are required");
        }
        
        const checkUserQuery = 'SELECT * FROM users WHERE email = $1 OR username = $2';
        const result = await db.query(checkUserQuery, [email, username]);

        if (result.rows.length > 0) {
            return res.status(409).json({success:false, message: 'User with that email or username already exists' });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = await createUser(email, username, hashedPassword);

        generateTokenAndSetCookie(res, newUser.id);

        return res.status(201).json({
            message: 'user registered successfully',
            user: newUser[0],
        })

    } catch (error) {
        res.status(500).json({success:false, message: error.message});
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        if(!password || !email){
            throw new Error("All fields are required");
        }

        const checkUserQuery = 'SELECT * FROM users WHERE email = $1';
        const result = await db.query(checkUserQuery, [email]);

        if (!(result.rows.length > 0)) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const user = result.rows[0];
        const storedHashedPassword = user.password;

        const isPasswordValid = await bcryptjs.compare(password, storedHashedPassword);

        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        generateTokenAndSetCookie(res, user.id);

        res.status(200).json({success: true, message: 'logged in successfully'});

    } catch (error) {
        console.log("Error in login: ", error);
        res.status(400).json({success: false, message: error.message});
    }

};

export const logout = async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({success: true, message: 'Logged out successfully'})
};

export const checkAuth = async (req, res) => {
    try {
        const user = await findUserById(req.userId);
        if (!user) {
            return res.status(400).json({success: false, message: 'User not found' });
        }

        res.status(200).json({success: true, user});

    } catch (error) {
        console.log('Error in checkAuth ',error);
        res.status(400).json({success: false, message: error.message});
    }
};