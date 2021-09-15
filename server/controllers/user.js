import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const secret = 'test';

export const signin = async (req, res) => {

    // Store user inputs
    const { email, password } = req.body;

    try {

        // Find user
        const existingUser = await User.findOne({ email });

        // Check user
        if(!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Store password check
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        // Check password
        if(!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const payload = {
            id: existingUser._id,
            email: existingUser.email,
        };

        const options = {
            expiresIn: '1h'
        };

        const token = jwt.sign(payload, secret, options);

        res.status(200).json({ result: existingUser, token });
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

export const signup = async (req, res) => {

    // Store user inputs
    const { email, password, firstName, lastName, confirmPassword } = req.body;

    try {
        // Find user
        const existingUser = await User.findOne({ email });

        // Check user
        if(existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Check password / confirm password
        if(password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Store password hash
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = await User.create({
            name: firstName + ' ' + lastName,
            email,
            password: hashedPassword,
        });

        const payload = {
            id: newUser._id,
            email: newUser.email,
        };

        const options = {
            expiresIn: '1h'
        };

        const token = jwt.sign(payload, secret, options);

        res.status(200).json({ result: newUser, token });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

};
